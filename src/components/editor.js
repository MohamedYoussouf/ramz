import React, {Component} from 'react';

let editorContent;
//  Editor compponent
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
      <div ref="editor"
        className="editor" 
        contentEditable={true} 
        suppressContentEditableWarning="true" 
        onInput={this.onInputChange}>
         أكتب شيئًا ما.
      </div>
    );
  };

  componentDidMount() {

    editorContent = this.refs.editor.innerText;
    this.onInputChange(this.state.content);

  }


  onInputChange(value) {
    editorContent = this.refs.editor.innerText;
    this.setState({content: editorContent});
    this.props.content(editorContent);

  }
}

export default Editor;
