import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Input, Select, Form, Modal, Button, Typography } from 'antd';
import axios from 'axios';

const CustomMarker = ({ onClick }) => (
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpKey, setPopUpKey] = useState(0);
  const [formulario, setFormulario] = useState({ visible: false, tipo: '' });

  const clickOnMap = ({ x, y, lat, lng, event }) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC5lobyQqUiuRQz6Gy5WydBszxcMnpzBHA`
      )
      .then(res => {
        setSelectedAddress(res.data.results[0].formatted_address);
        setSelectedPoint({ direccion: selectedAddress, categoria: 'comercial', lat, lng });
        setFormulario({ visible: true, tipo: 'Agregar' });
      });
  };

  const clickOnMarker = marker => {
    setSelectedPoint(marker);
    setSelectedIndex(markers.indexOf(marker));
    setFormulario({ visible: true, tipo: 'Editar' });
  };

  const childEnter = key => {
    console.log('enter');
    setPopUpKey(key);
    setShowPopUp(true);
  };

  const childLeave = (key, childProps) => {
    setTimeout(() => setShowPopUp(false), 5000);
  };

  const handleMarkerChange = event => {
    let modify = { ...selectedPoint };
    modify[event.target.name] = event.target.value;
    setSelectedPoint(modify);
  };

  const handleMarkerChangeSelect = event => {
    let modify = { ...selectedPoint };
    modify['categoria'] = event;
    setSelectedPoint(modify);
  };

  const addMarker = () => {
    setMarkers([...markers, selectedPoint]);
    setFormulario({ visible: false });
  };
  const saveMarker = () => {
    setMarkers([
      ...markers.map((element, index) => {
        if (selectedIndex === index) {
          return selectedPoint;
        } else {
          return element;
        }
      })
    ]);
    setFormulario({ visible: false });
  };

  const deleteMarker = () => {
    setMarkers([
      ...markers.filter(element => markers.indexOf(element) !== selectedIndex)
    ]);
    setFormulario({ visible: false });
  };

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
            <Input
              name='nombre'
              placeholder='Nombre'
              value={selectedPoint.nombre}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
          <Form.Item label='Direccion'>
            <Input
              name='direccion'
              placeholder='Direccion'
              value={selectedPoint.direccion}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
          <Form.Item label='Telefono'>
            <Input
              name='telefono'
              placeholder='Telefono'
              value={selectedPoint.telefono}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
          <Form.Item label='Categoria'>
            <Select
              name='categoria'
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
              name='coordenadas'
              placeholder='Coordenadas'
              value={selectedPoint.lat + ', ' + selectedPoint.lng}
              onChange={e => handleMarkerChange(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const renderPopUp = () => {
    let pop = markers[popUpKey];
    if (showPopUp && pop) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            height: '100px',
            width: '200px',
            transform: 'translate(20px, -100px)',
            borderRadius: '1px'
          }}
          lat={pop.lat}
          lng={pop.lng}>
          <Typography>{pop.nombre}</Typography>
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  };

  const mostrarMarcadores = () => {
    return markers.map((marker, index) => {
      return (
        <CustomMarker
          key={index}
          lat={marker.lat}
          lng={marker.lng}
          text={marker.text}
          onClick={() => clickOnMarker(marker)}
        />
      );
    });
  };

  console.log('sp: ', selectedPoint);
  console.log(markers);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC5lobyQqUiuRQz6Gy5WydBszxcMnpzBHA' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={clickOnMap}
        onChildMouseEnter={childEnter}
        onChildMouseLeave={childLeave}>
        {renderFormulario()}
        {renderPopUp()}
        {mostrarMarcadores()}
      </GoogleMapReact>
    </div>
  );
}
