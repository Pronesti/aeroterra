import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Input, Select, Form, Modal } from 'antd';

const Marker = ({ onClick }) => (
  <Icon type='environment' style={{ fontSize: 32 }} onClick={onClick} />
);

const defaultProps = {
  center: {
    lat: -34.599184,
    lng: -58.450783
  },
  zoom: 13
};
let markers = [{ lat: -34.599184, lng: -58.450783, text: 'Marker1' }];

export default function Gmap(props) {
  const [selectedPoint, setSelectedPoint] = useState();
  const [visibleAgregar, setVisibleAgregar] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);

  const clickOnMap = ({ x, y, lat, lng, event }) => {
    setSelectedPoint({lat, lng});
    setVisibleAgregar(true);
    console.log(x, y, lat, lng, event);
  };

  const clickOnMarker = (marker) => {
    setSelectedPoint({lat: marker.lat, lng: marker.lng});
    setVisibleEditar(true);
  }

  const formularioAgregar = () => {
    return (
      <Modal
        title='Agregar Marcador'
        visible={visibleAgregar}
        handleOk={() => console.log('acc')}
        handleCancel={() => setVisibleAgregar(false)}>
        <Form.Item label="Nombre">
        <Input placeholder='Nombre' />
        </Form.Item>
        <Form.Item label="Direccion">
        <Input placeholder='Direccion' />
        </Form.Item>
        <Form.Item label="Telefono">
        <Input placeholder='Telefono' />
        </Form.Item>
        <Form.Item label="Categoria">
        <Select defaultValue='comercial' style={{ width: 120 }}>
          <Select.Option value='comercial'>Comercial</Select.Option>
          <Select.Option value='residencial'>Residencial</Select.Option>
          <Select.Option value='rixta'>Mixta</Select.Option>
        </Select>
        </Form.Item>
        <Form.Item label="Coordenadas">
        <Input placeholder='Coordenadas' />
        </Form.Item>
      </Modal>
    );
  };
  const formularioEditar = () => {
    return (
      <Modal
        title='Editar Marcador'
        visible={visibleEditar}
        onOk={() => console.log('acc')}
        onCancel={() => setVisibleEditar(false)}
      >
      <Form.Item label="Nombre">
        <Input placeholder='Nombre'/>
        </Form.Item>
        <Form.Item label="Direccion">
        <Input placeholder='Direccion' />
        </Form.Item>
        <Form.Item label="Telefono">
        <Input placeholder='Telefono' />
        </Form.Item>
        <Form.Item label="Categoria">
        <Select defaultValue='comercial' style={{ width: 120 }}>
          <Select.Option value='comercial'>Comercial</Select.Option>
          <Select.Option value='residencial'>Residencial</Select.Option>
          <Select.Option value='rixta'>Mixta</Select.Option>
        </Select>
        </Form.Item>
        <Form.Item label="Coordenadas">
        <Input placeholder='Coordenadas' />
        </Form.Item>
      </Modal>
    );
  };

  const mostrarMarcadores = () => {
    return markers.map((marker, index) => {
      return (
        <Marker
          key={index}
          lat={marker.lat}
          lng={marker.lng}
          text={marker.text}
          onClick={() => clickOnMarker(marker)}
        />
      );
    });
  };

  console.log('SP: ', selectedPoint);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC5lobyQqUiuRQz6Gy5WydBszxcMnpzBHA' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={clickOnMap}>
        {formularioAgregar()}
        {formularioEditar()}
        {mostrarMarcadores()}
      </GoogleMapReact>
    </div>
  );
}
