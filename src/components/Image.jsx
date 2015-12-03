import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm} from 'redux-form';
import classNames from 'classnames';


let ImageFormComponent = React.createClass({
  render() {
    const {fields: {title, description}, handleSubmit} = this.props;
    console.log(description);

    return <form onSubmit={handleSubmit}>
      <div>
        <label>Otsikko</label>
        <input type="text" placeholder="Otsikko" {...title}/>
      </div>
      <div>
        <label>Kuvaus</label>
        <textarea {...description}></textarea>
      </div>
      <button type="submit" onClick={this.handleSubmit}>Tallenna</button>
    </form>;
  }
});
let ImageForm = reduxForm({
  fields: ['title', 'description']
})(ImageFormComponent);




export default React.createClass({
  mixins: [PureRenderMixin],

  update(newProps) {
    this.props.updateModel(this.props.image.get('id'), 'images', newProps);
  },

  toggleEditMode() {
    this.update({ meta: { editMode: !this.props.image.getIn(['meta', 'editMode']) }});
  },

  handleFormSubmit(formValues) {
    let newProps = Object.assign({}, formValues, { meta: { editMode: false }})
    this.update(newProps);
  },

  update(newProps) {
    this.props.updateModel(this.props.image.get('id'), 'images', newProps);
  },


  render: function() {
    let model = this.props.image.toJS();

    if (this.props.image.getIn(['meta', 'editMode'])) {
      let formValues = { title: model.title, description: model.description };

      return <div>
        <ImageForm
          onSubmit={this.handleFormSubmit}
          initialValues={formValues}
          form={'imageForm-' + model.id}/>
      </div>;
    }
    else {
      return <div>
        <p>#{model.id} / {model.title}</p>
        <button onClick={this.toggleEditMode}>edit</button>
      </div>;
    }
  }
});
