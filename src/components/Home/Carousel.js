/* eslint-disable no-undef,no-alert */
import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';


class ControlledCarousel extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null
        };
    }

    handleSelect(selectedIndex, e) {
        alert(`selected=${selectedIndex}, direction=${e.direction}`);
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        const {index, direction} = this.state;

        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/carousel.png"/>
                    <Carousel.Caption>
                        <h3>En sioc.com.ar te podés contactar con la propiedad que mas te guste a través de whatsapp,
                            eso te permite saber si tu mensaje se envió, se recibió o se leyó.
                        </h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/carousel.png"/>
                    <Carousel.Caption>
                        <h3>Nuestra web te permite acceder en real-time a las características de la propiedad que estás
                            mirando en la calle, desde cualquier dispositivo
                        </h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/carousel.png"/>
                    <Carousel.Caption>
                        <h3>Nuestra web te permite acceder en real-time a las características de la propiedad que estás
                            mirando en la calle, desde cualquier dispositivo
                        </h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default ControlledCarousel;
