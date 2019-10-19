import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Input, Select, Form, Modal, Button, List } from 'antd';
import axios from 'axios';
import jsonData from './../data/markers.json';

const loadData = () => JSON.parse(JSON.stringify(jsonData));

const CustomMarker = ({ onClick, icon }) => {
  let iconString;
  switch (icon) { //Define el icono segun la categoria
    case 'residencial':
      iconString = 'home';
      break;
    case 'mixta':
      iconString = 'environment';
      break;
    case 'comercial':
      iconString = 'shop';
      break;
    default:
      iconString = 'environment';
      break;
  }
  return <Icon type={iconString} style={{ fontSize: 32 }} onClick={onClick} />;
};

const defaultProps = {
  center: {
    lat: -34.599184,
    lng: -58.450783
  },
  zoom: 13
};

export default function Gmap() {
  //Hooks para manejar el estado
  const [markers, setMarkers] = useState([loadData()]);
  const [selectedPoint, setSelectedPoint] = useState({ nombre: '', direccion: '', telefono: '', categoria: '', lat: 0, lng: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpKey, setPopUpKey] = useState(0);
  const [formulario, setFormulario] = useState({ visible: false, tipo: '' });

  const clickOnMap = ({ x, y, lat, lng, event }) => {
    //Usuario hace click en el mapa.
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC5lobyQqUiuRQz6Gy5WydBszxcMnpzBHA`
      )
      .then(res => {
        setSelectedAddress(res.data.results[0].formatted_address);
        setSelectedPoint({
          direccion: selectedAddress,
          categoria: 'comercial',
          lat,
          lng
        });
        setFormulario({ visible: true, tipo: 'Agregar' });
      });
  };

  const clickOnMarker = marker => {
    //Usuario hace click en un marcador
    setSelectedPoint(marker);
    setSelectedIndex(markers.indexOf(marker));
    setFormulario({ visible: true, tipo: 'Editar' });
  };

  const childEnter = key => {
    // Mouse entra en Marcador
    setPopUpKey(key);
    setShowPopUp(true);
  };

  const childLeave = () => {
    // Mouse sale del marcador
    setTimeout(() => setShowPopUp(false), 5000);
  };

  const handleMarkerChange = event => {
    // Actualiza el objeto con los input del formulario
    let modify = { ...selectedPoint };
    modify[event.target.name] = event.target.value;
    setSelectedPoint(modify);
  };

  const handleMarkerChangeSelect = event => {
    //Actualiza el objeto con el select del formulario
    let modify = { ...selectedPoint };
    modify['categoria'] = event;
    setSelectedPoint(modify);
  };

  const addMarker = () => {
    // Agrega un marcador
    if (validateFields() === 0) {
      setMarkers([...markers, selectedPoint]);
      setFormulario({ visible: false });
    } else {
      alert(validateFields());
    }
  };
  const saveMarker = () => {
    // Guarda la edicion de un marcador
    if (validateFields() === 0) {
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
    } else {
      alert(validateFields());
    }
  };

  const deleteMarker = () => {
    // Elimina un marcador
    setMarkers([
      ...markers.filter(element => markers.indexOf(element) !== selectedIndex)
    ]);
    setFormulario({ visible: false });
  };

  const validateFields = () => {
    let error = 0;
    if (selectedPoint.nombre === '') {
      error = 'Debe ingresar un nombre';
    } else if (selectedPoint.direccion === '') {
      error = 'Debe ingresar una direccion';
    } else if (selectedPoint.telefono === '') {
      error = 'Debe ingresar un telefono';
    } else if (selectedPoint.categoria === '') {
      error = 'Debe ingresar una categoria';
    } else if (selectedPoint.lat === '' || selectedPoint.lng === '') {
      error = 'Debe ingresar unas coordenadas validas';
    }
    return error;
  };

  const footer = () => {
    //Renderiza los botones segun el tipo de formulario
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
    //Renderiza el formulario
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
              <Select.Option value='mixta'>Mixta</Select.Option>
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
    //Renderiza el InfoBox con la informacion
    let pop = markers[popUpKey];
    if (showPopUp && pop) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            minHeight: '100px',
            minWidth: '200px',
            transform: 'translate(30px, -100px)',
            borderRadius: '1px'
          }}
          lat={pop.lat}
          lng={pop.lng}>
          <List size='small'>
            <List.Item>{pop.nombre}</List.Item>
            <List.Item>Direccion: {pop.direccion}</List.Item>
            <List.Item>Telefono: {pop.telefono}</List.Item>
            <List.Item>Categoria: {pop.categoria}</List.Item>
            <List.Item>Coordenadas: {pop.lat + ', ' + pop.lng}</List.Item>
          </List>
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  };

  const mostrarMarcadores = () => {
    //Renderiza los marcadores en el Mapa
    return markers.map((marker, index) => {
      return (
        <CustomMarker
          key={index}
          lat={marker.lat}
          lng={marker.lng}
          icon={marker.categoria}
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
