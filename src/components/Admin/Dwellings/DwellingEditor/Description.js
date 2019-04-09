import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {BeatLoader} from 'react-spinners';

import {
    FormControl,
    FormGroup
} from 'react-bootstrap';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import {Dwelling} from '../../../../model/index';
import {requestSaveDwelling} from '../../../../actions/index';
import ImagesService from '../../../../services/images';
import Http from '../../../../services/images';

const CLOUDINARY_UPLOAD_PRESET = 'dq2mxij7';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sanchez-cia/image/upload';
const CLOUDINARY_API_KEY = '773121298349798';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '8px',
    // padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : '#fafafa',
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#fff',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    float: 'left',
    width: 'auto'
});

// const apiKey = 651684583823529;
// const uploadPreset = 'gceayald';

class Description extends Component {

    static propTypes = {
        requestSaveDwelling: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwelling: PropTypes.shape({})
    };

    static defaultProps = {
        dwelling: new Dwelling()
    };

    constructor(props) {
        super(props);
        this.state = {
            dwelling: new Dwelling(),
            uploadImgStart: false
        };
        if (this.props.dwelling) {
            this.state = this.props;
        }

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    async onImageDrop(files) {
        this.setState({uploadImgStart: true});
        let uploadedFiles = await ImagesService.upload(files);
        if (uploadedFiles) {
            this.setState({uploadImgStart: false});
            uploadedFiles = [...this.state.dwelling.images, ...uploadedFiles];
            this.setState(
                state => ({
                    dwelling: (Object.assign(state.dwelling, {images: uploadedFiles}))
                  })
            );

        }

    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const imgages = reorder(
            this.state.dwelling.images,
            result.source.index,
            result.destination.index
        );

        var state = this.state;
        state.dwelling.images = imgages;
        this.setState(state);
        this.state.dwelling.images = imgages;
    }

    async onHandleDeleteImg(event, index) {
        const images = [...this.state.dwelling.images];
        images.splice(index, 1);
        const result = await ImagesService.deleteImg(event.target.id);
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling, {images}))
            })
        );
    }

    handleChange({target: {id, value}}) {
        var state = this.state;
        this.setState(
            state => ({
	            dwelling : (Object.assign(state.dwelling, {[id]: value}))
            })
        );
        this.setState(
            state => (state)
        );
    }

    handleSubmit() {
        const {dwelling} = this.state;
        dwelling.updatedAt = new Date();
        this.props.requestSaveDwelling(dwelling);
        this.props.history.push('/admin/dwellings/latest');
    }

    render() {
        const {dwelling} = this.state;
        let img_url;
        return (
            <Container fluid className="animated fadeIn">
                {/*<Row>
                    <Col sm={12} className="multi-steps mb-4">
                        <ol className="in-multi-steps text-top">
                            <li>
                                <span>
                                    <FontAwesome
                                        name="home"
                                        style={{color: 'rgba(0,0,0,.3)'}}
                                    />
                                </span>
                            </li>
                            <li className="">
                                <span>
                                    <FontAwesome
                                        name="cog"
                                        spin
                                        style={{color: 'rgba(0,0,0,.3)'}}
                                    />
                                </span>
                            </li>
                            <li className="current">
                                <span>
                                    <FontAwesome name="check-square" style={{color: 'rgba(0,0,0,.3)'}}/>
                                </span>
                            </li>
                        </ol>
                    </Col>
                </Row>*/}
                <Row>
                    <Col sm={6}>
                        <h2>Descripción General</h2>
                        <FormGroup controlId="generalDescription">
                            <FormControl
                                componentClass="textarea"
                                value={dwelling.generalDescription}
                                onChange={e => this.handleChange(e)}
                                placeholder="Escriba una Descripcion general"
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <h2>Descripción Privada</h2>
                        <FormGroup controlId="privateDescription">
                            <FormControl
                                componentClass="textarea"
                                value={dwelling.privateDescription}
                                onChange={e => this.handleChange(e)}
                                placeholder="Escriba una Descripcion privada"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <h2>Carga de Imágenes </h2>

                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={true}
                            accept="image/*"
                            className="img-dropzone mb-5"
                        >
                            <FontAwesome name="plus"/> <br/>
                            Arrastrá una imagen hasta aquí o hacé click para seleccionar un archivo.
                        </Dropzone>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {
                                        this.state.uploadImgStart && dwelling.images.length !== 0 ?
                                            <Draggable>
                                                {(provided, snapshot) => (
                                                <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      style={getItemStyle(
                                                          snapshot.isDragging,
                                                          provided.draggableProps.style
                                                      )}
                                                  >
                                                    <div
                                                        style={{
                                                          float: 'left',
                                                          marginRight: '5px',
                                                          width: '180px',
                                                          height: '160px',
                                                          display: 'flex',
                                                          justifyContent: 'center',
                                                          alignItems: 'center'
                                                    }}>
                                                        <BeatLoader
                                                          color="#fbad1c"
                                                          loading={this.state.uploadImgStart}
                                                        />
                                                    </div>
                                                </div>
                                                )}
                                            </Draggable>
                                        :
                                        <div/>
                                    }
                                    {
                                        this.state.uploadImgStart && dwelling.images.length === 0
                                            ?
                                                <Draggable>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <div
                                                                style={{
                                                                  float: 'left',
                                                                  marginRight: '5px',
                                                                  width: '180px',
                                                                  height: '160px',
                                                                  display: 'flex',
                                                                  justifyContent: 'center',
                                                                  alignItems: 'center'
                                                            }}>
                                                            <BeatLoader
                                                                color="#fbad1c"
                                                                loading={this.state.uploadImgStart}
                                                            />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            :
                                            this.state.uploadImgStart && dwelling.images.length !== 0 ?
                                              dwelling.images.map((newImage, index) => {
                                                let img_url = newImage.secure_url.replace('/upload/', '/upload/w_200,q_auto,f_auto/');
                                                return (
                                                        <Draggable
                                                            key={newImage.public_id}
                                                            draggableId={newImage.public_id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style
                                                                    )}
                                                                >
                                                                    <div
                                                                        className="img"
                                                                        style={{
                                                                            float: 'left',
                                                                            marginRight: '5px',
                                                                            width: '180px',
                                                                            height: '160px',
                                                                            backgroundSize: 'cover',
                                                                            backgroundImage: 'url("' + img_url + '")'
                                                                        }}
                                                                    />
                                                                    <Button
                                                                        id={newImage.delete_token}
                                                                        className="delete-img-dnd"
                                                                        onClick={e => this.onHandleDeleteImg(e, index)}
                                                                    >
                                                                        <FontAwesome name="times"/>
                                                                    </Button>

                                                                </div>
                                                            )}
                                                        </Draggable>
                                                )
                                            })
                                            :
                                            dwelling.images.map((newImage, index) => {
                                                let img_url = newImage.secure_url.replace('/upload/', '/upload/w_200,q_auto,f_auto/');
                                                return (
                                                            <Draggable
                                                                key={newImage.public_id}
                                                                draggableId={newImage.public_id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                // float: 'left',
                                                                                // marginRight: '5px',
                                                                                width: '180px',
                                                                                height: '160px',
                                                                                backgroundSize: 'cover',
                                                                                backgroundImage: 'url("' + img_url + '")'
                                                                            }}
                                                                        ></div>
                                                                        <Button
                                                                            id={newImage.delete_token}
                                                                            className="delete-img-dnd"
                                                                            onClick={e => this.onHandleDeleteImg(e, index)}
                                                                        >
                                                                            <FontAwesome name="times"/>
                                                                        </Button>
                                                                    </div>

                                                                )}
                                                            </Draggable>
                                                )
                                            })
                                    }
                                </div>
                            )}
                        </Droppable>
                        </DragDropContext>
                    </Col>

                </Row>
                <div className="padding-sm"></div>
                <div className="float-btns">
                    <Button
                        className="goback"
                        onClick={() => this.props.history.push('/admin/dwellings/characteristics')}>
                        <FontAwesome name="angle-left"/>
                    </Button> {' '}
                    <Button
                        className="next"
                        disabled={!(dwelling.images.length > 0)}
                        onClick={() => this.handleSubmit()}>
                        <FontAwesome name="check"/>
                    </Button>
                </div>
            </Container>
        );
    }
}

export default connect(
    state => ({
        dwelling: state.dwelling.dwelling
    }),
    dispatch => ({
        requestSaveDwelling: dwelling => dispatch(requestSaveDwelling(dwelling))
    })
)(Description);
