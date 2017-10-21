import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import showdown, {Converter} from 'showdown';
import HtmlToReactParser from 'html-to-react';
import {IoCodeDownload, IoIosDownload} from 'react-icons/lib/io';

//  Import Components
import Editor from './components/editor';
import Preview from './components/preview';
import SideMenu from './components/SideMenu';

require('./scss/app.scss');

let reactElement;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
    this.onLoad = this.onLoad.bind(this)
    this.contentHandler = this.contentHandler.bind(this)
    this.toMarkDown = this.toMarkDown.bind(this)
  };

  render() {

    var htmlToReactParser = new HtmlToReactParser.Parser();

    reactElement = htmlToReactParser.parse(this.toMarkDown(this.state.inputText))
    var html = this.toMarkDown(this.state.inputText);
    var text = this.state.inputText;
    //  Menu items
    const menuItems = [
      {
        'id': 1,
        'icon': <IoIosDownload/>,
        'title': 'حفض كنص',
        'method' () {
            const virtualAnchor = document.createElement('a');
            virtualAnchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            virtualAnchor.setAttribute('download', 'text file');

            virtualAnchor.style.display = 'none';
            document.body.appendChild(virtualAnchor);

            virtualAnchor.click();

            document.body.removeChild(virtualAnchor);
        }
      },
      {
        'id': 2,
        'icon': <IoCodeDownload/>,
        'title': 'حفض كصفحة html',
        'method' () {
            const virtualAnchor = document.createElement('a');
            const htmlFileTemplate = '<html dir="rtl"><head><title>تيست مقال</title><link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notokufiarabic.css"><link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/droidarabicnaskh.css"><style>body {font-family:"Droid Arabic Naskh", sans-serif, tahoma;} h1, h2, h3, h4, h5, h6 {font-family:"Noto Kufi Arabic", sans-serif, tahoma}</style></head></header><body style="background:#F7F7F7;font-family:"Droid Arabic Naskh", sans-serif, tahoma;"><div style="width:1000px;padding: 3rem 1rem;margin:auto;word-break:break-word;">' + html + '</div></body>';
            virtualAnchor.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlFileTemplate));
            virtualAnchor.setAttribute('download', 'text file');

            virtualAnchor.style.display = 'none';
            document.body.appendChild(virtualAnchor);

            virtualAnchor.click();

            document.body.removeChild(virtualAnchor);
        }
      }
    ]
    return (
        <div className="container" dir="rtl">
            <SideMenu items={menuItems}/>
            <Editor content={this.onLoad}/>
            <Preview toShow={reactElement}/>
        </div>
    );
  };

  componentDidMount() {
    this.onLoad;
  }

  onLoad(content) {
    this.contentHandler(content)
  }

  contentHandler(value) {
    this.setState(prevState => ({inputText: value}));
  }
  // Function to convert markdown syntax into html
  toMarkDown(input) {
    const converter = new Converter();
    return converter.makeHtml(input);
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
