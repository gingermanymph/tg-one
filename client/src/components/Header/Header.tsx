import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/tg-icon.png';

export interface HeaderProps {}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000063;
  color: white;
  height: 40px;
  padding: 5px 10px 5px 10px;
  font-size: 13px;
  font-family: 'Roboto Mono', monospace;
  font-weight: 300;
  div {
    font-size: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }
  }
`;

const Header: React.SFC<HeaderProps> = () => (
  <StyledHeader>
    <div>
      <img src={logo} alt="logo" />
      <h1>tg-one</h1>
    </div>
    <h2>*(definitely not a telegram)</h2>
  </StyledHeader>
);

export default Header;
