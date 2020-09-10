import React, {useEffect, useState} from "react";
import {Carousel, Col, Container, Row} from "react-bootstrap";

const Gallery = () => {
	let [art, setArt] = useState([] as Array<any>);
	useEffect(() => {
		const getter = async () => {
			try {
				let response = await fetch("/api/all_art");
				if (response.ok) {
					setArt(await response.json());
				} else throw await response.json();
			} catch (e) {
				console.error(e);
			}
		};
		getter();
	}, []);
	return (
			<Container className="my-3">
				<Row>
					<Col>
						<h1>Gallery</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<Carousel>
							{art.map((artwork) => {
								return (
										<Carousel.Item>
											<img src={artwork.data} alt={artwork.Name}/>
										</Carousel.Item>
								);
							})}
						</Carousel>
					</Col>
				</Row>
			</Container>
	);
};
export default Gallery;
