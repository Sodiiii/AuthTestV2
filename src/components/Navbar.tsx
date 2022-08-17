import { Layout, Row, Menu } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import "./nav.css";

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <Layout.Header>
      <Row justify="end">
        <Menu theme="dark" mode="horizontal" selectable={false}>
          <button className="btn" onClick={(e) => handleLogout(e)}>
            Выйти
          </button>
        </Menu>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
