import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Input, Select, Form, Modal, Button } from 'antd';

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

export default function Gmap() {
  const [markers, setMarkers] = useState([
    {
      nombre: 'Marker1',
      direccion: 'calle falsa 123',
      telefono: '46484544',
      categoria: 'comercial',
      lat: -34.599184,
      lng: -58.450783
    }
  ]);

  const [selectedPoint, setSelectedPoint] = useState({ lat: 0, lng: 0 });
  const [formulario, setFormulario] = useState({ visible: false, tipo: '' });

  const clickOnMap = ({ x, y, lat, lng, event }) => {
    setSelectedPoint({ lat, lng });
    setFormulario({ visible: true, tipo: 'Agregar' });
  };

  const clickOnMarker = marker => {
    setSelectedPoint(marker);
    setFormulario({ visible: true, tipo: 'Editar' });
  };

  const handleMarkerChange = event => {
    let modify = {...selectedPoint};
    modify[event.target.name] = event.target.value;
    setSelectedPoint(modify);
  };

  const handleMarkerChangeSelect = event => {
    let modify = {...selectedPoint};
    modify['categoria'] = event;
    setSelectedPoint(modify);
  };

  const addMarker = () => setMarkers([...markers, ...selectedPoint]);
  const saveMarker = () => setMarkers([...markers.splice(selectedPoint, 1), ...selectedPoint]);
  const deleteMarker = () => setMarkers([...markers.splice(selectedPoint,1)]);

  const footer = () => {
    if (formulario.tipo === 'Agregar') {
      return [
        <Button onClick={addMarker}>Agregar</Button>,
        <Button onClick={() => setFormulario({ visible: false })}>
          Cancelar
        </Button>
      ];
    } else {
      return [
        <Button onClick={saveMarker}>Editar</Button>,
        <Button onClick={deleteMarker}>Eliminar</Button>,
        <Button onClick={() => setFormulario({ visible: false })}>
          Cancelar
        </Button>
      ];
    }
  };

  const renderFormulario = () => {
    return (
      <Modal
        title={formulario.tipo + ' Marcador'}
        visible={formulario.visible}
        footer={footer()}>
        <Form onSubmit={addMarker}>
          <Form.Item label='Nombre'>
            <Input name="nombre" placeholder='Nombre' value={selectedPoint.nombre} onChange={e => handleMarkerChange(e)} />
          </Form.Item>
          <Form.Item label='Direccion'>
            <Input
              name="direccion"
              placeholder='Direccion'
              value={selectedPoint.direccion}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
          <Form.Item label='Telefono'>
            <Input
              name="telefono"
              placeholder='Telefono'
              value={selectedPoint.telefono}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
          <Form.Item label='Categoria'>
            <Select
              name="categoria"
              defaultValue={selectedPoint.categoria}
              style={{ width: 120 }}
              onChange={e => handleMarkerChangeSelect(e)}>
              <Select.Option value='comercial'>Comercial</Select.Option>
              <Select.Option value='residencial'>Residencial</Select.Option>
              <Select.Option value='rixta'>Mixta</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Coordenadas'>
            <Input
              name="coordenadas"
              placeholder='Coordenadas'
              value={selectedPoint.lat + ', ' + selectedPoint.lng}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
        </Form>
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

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC5lobyQqUiuRQz6Gy5WydBszxcMnpzBHA' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={clickOnMap}>
        {renderFormulario()}
        {mostrarMarcadores()}
      </GoogleMapReact>
    </div>
  );
}
