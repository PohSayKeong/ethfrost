"use client";
import {
  Card,
  Grid,
  Text,
  Button,
  Row,
  Col,
  Dropdown,
  Input,
  FormElement,
  Avatar,
  Spacer,
  Loading,
  Modal,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface CardComponentProps {
  title: string;
  body: string;
  icon: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, body, icon }) => (
  //   <Card style={{ padding: "1rem" }}>
  //     <Card.Image src={icon} />
  //     <Card.Header>{title}</Card.Header>
  //     <Card.Body css={{ padding: 0 }}>{body}</Card.Body>
  //   </Card>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    }}
  >
    <img
      src={icon}
      style={{
        width: "4rem",
        height: "4rem",
        marginBottom: "-2rem",
        zIndex: "10",
      }}
      alt={title}
    />
    <div
      style={{
        border: "2px solid",
        borderImageSource:
          "linear-gradient( 269.68deg, rgba(255, 255, 255, 0.05) 5.14%, rgba(255, 255, 255, 0) 102.55% )",
        paddingBottom: "3rem",
        paddingTop: "4rem",
        backgroundColor: "rgb(36 36 44/1)",
        borderRadius: "1rem",
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "white",
          marginTop: "calc(3rem * calc(1))",
          marginBottom: "calc(2rem * calc(1))",
          opacity: ".75",
          lineHeight: "22px",
          fontWeight: "400",
          fontSize: "1rem",
          textAlign: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        {body}
      </div>
    </div>
  </div>
);

export default CardComponent;
