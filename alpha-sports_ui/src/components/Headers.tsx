import React from 'react';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo-black.png';
import 'semantic-ui-css/semantic.min.css';

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header onClick={() => handleItemClick('/')}>
          <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
          OnlyStats
        </Menu.Item>
        <Menu.Item as="a" onClick={() => handleItemClick('/')}>Home</Menu.Item>

        <Dropdown item simple text="Services">
          <Dropdown.Menu>
            <Dropdown.Divider />
            <Dropdown.Header>Football</Dropdown.Header>
            <Dropdown.Item onClick={() => handleItemClick('/analytics')}>
              <i className="dropdown icon" />
              <span className="text">Analytics</span>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => { e.stopPropagation(); handleItemClick('/recommendations'); }}>
                  Player Recommendations
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { e.stopPropagation(); handleItemClick('/salary'); }}>
                  Salary Prediction
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { e.stopPropagation(); handleItemClick('/injury'); }}>
                  Injury Prediction
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleItemClick('/services')}>
              Fantasy League
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
};

export default HeaderComponent;