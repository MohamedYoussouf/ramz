import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from "react-helmet";

import showdown, {Converter} from 'showdown';
import HtmlToReactParser from 'html-to-react';
import previewIcon from './icons/preview.svg';

//  Import Components
import Editor from './components/editor';
import Preview from './components/preview';
import TopBar from './components/topBar';
//  Immport css styles
import './scss/app.scss';

let innerHtml,
textDir = 'rtl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      isRTL: true,
      title: 'أهلا بالعالم!'
    }
    this.onLoad = this.onLoad.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.contentHandler = this.contentHandler.bind(this)
    this.toMarkDown = this.toMarkDown.bind(this)
  };

  render() {

    const htmlToReactParser = new HtmlToReactParser.Parser();

    innerHtml = htmlToReactParser.parse(this.toMarkDown(this.state.inputText))
    const html = this.toMarkDown(this.state.inputText);
    const text = this.state.inputText;
    const docTitle = this.state.title;
    //  Menu Items Object
    const menuItems = [
      {
        'id': 1,
        'icon': null,
        'text': 'حفظ',
        'title': 'حفظ المستند',
        'method': null,
        'submenu': [
          {
            'id': 1,
            'title': 'حفظ كمستند نصي',
            'method': () => {
              const virtualAnchor = document.createElement('a');
              virtualAnchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
              virtualAnchor.setAttribute('download', docTitle);

              virtualAnchor.style.display = 'none';
              document.body.appendChild(virtualAnchor);

              virtualAnchor.click();

              document.body.removeChild(virtualAnchor);
            }
          },
          {
            //  Save as HTML
            'id': 2,
            'title': 'حفظ كصفحة HTML',
            'method': () => {
              const virtualAnchor = document.createElement('a');
              const htmlFileTemplate = `<html dir="rtl"><head><title>${docTitle}</title><link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notokufiarabic.css"><link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/droidarabicnaskh.css"><style>body {font-family:"Droid Arabic Naskh", sans-serif, tahoma;} h1, h2, h3, h4, h5, h6 {font-family:"Noto Kufi Arabic", sans-serif, tahoma} footer{text-align:center;} footer a {color:#FF686B;text-decoration:none;} footer p {margin: 25px 0 30px 0;} footer img {width:70px;}</style></head><body style="background:#fff;font-family:"Droid Arabic Naskh", sans-serif, tahoma;"><div style="width:700px;padding: 3rem 1rem;margin:auto;word-break:break-word;">${html}</div><footer><p>تم توليد هذه الصفحة بواسطة <a href="#">رمز</a></p><a href="#"><img src="data:image/png;base64,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"/></a></footer></body></html>`;

              virtualAnchor.setAttribute('href', 'data:text/html, ' + htmlFileTemplate);
              virtualAnchor.setAttribute('download', docTitle);
  
              virtualAnchor.style.display = 'none';
              document.body.appendChild(virtualAnchor);
  
              virtualAnchor.click();
  
              document.body.removeChild(virtualAnchor);

            }
          },
        ]
      },
      {
        'id': 2,
        'icon': previewIcon,
        'title': 'استعراض النتيجة',
        'method' () {
          var element = document.getElementById("body-wrapper");

          if (element.classList) {
          element.classList.toggle("toggle-preview");
          } else {
          var classes = element.className.split(" ");
          var i = classes.indexOf("toggle-preview");

          if (i >= 0)
          classes.splice(i, 1);
          else
          classes.push("toggle-preview");
          element.className = classes.join(" ");
          }
        }
      },
      // {
      //   'id': 4,
      //   'icon': textDirectionIcon,
      //   'title': 'اتجاه الكتابة',
      //   'method' () {
      //     if (!self.state.isRTL) {
      //       textDir = 'ltr';
      //     } else {
      //       textDir = 'rtl';
      //     }
      //     self.setState({isRTL: !self.state.isRTL});
      //     console.log(self.state.direction);
      //   }
      // }
    ]
    return (
      <div className="container" dir={textDir}>
        <Helmet>
            <title>رمز - محرر markdown أونلاين</title>
            <meta name="description" content="محرر markdown أونلاين متكامل ويدعم العربية"/>
        </Helmet>
        <TopBar items={menuItems} value={this.state.title} onChangeValue={this.handleChange}/>
        <div className="body-wrapper" id="body-wrapper">
          <Editor content={this.onLoad}/>
          <Preview toShow={innerHtml}/>
        </div>
        <p className="credits">تطوير <a href="https://www.mohamedmya.com/">محمد يوسف</a> رمز مشروع مفتوح مصدر <a href="https://github.com/MohamedYoussouf/ramz">ساهم بتطويره</a></p>
      </div>
    );
  };

  componentDidMount() {
    this.onLoad;
  }

  onLoad(content) {
    this.contentHandler(content)
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    console.log(this.state.title)
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
