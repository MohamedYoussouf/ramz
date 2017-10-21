import React, {Component} from 'react';

let editorContent;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'أكتب ما في ذهنك!'
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  render() {
    return (
      <div ref="editor" className="editor" contentEditable={true} onInput={this.onInputChange}>
      </div>
    );
  };

  componentDidMount() {

    editorContent = this.refs.editor.innerText;

    // this.setState({content: editorContent});
    this.onInputChange(this.state.content);

  }


  onInputChange(value) {
    console.log(localStorage.getItem('storedContent'));

    editorContent = this.refs.editor.innerText;
    // console.log(event.target.value);
    this.setState({content: editorContent});
    this.props.content(editorContent);

  }
}

export default Editor;
