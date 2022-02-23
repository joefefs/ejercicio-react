import axios from "axios";
import React, { useState } from "react";
import payloadOrder from "./data/payloadOrder";
import paymentPayload1 from "./data/paymentPayload1";
import "./App.css";
import GiftCard from "./GiftCard";

function App() {
  const [respuesta, setRespuesta] = useState();
  const [isVissible, setIsVissible] = useState({
    createOrder: true,
    sendPayload: false,
  });
  const [payload, setPayload] = useState(paymentPayload1);
  const [iframe, setIFrame] = useState({
    url: "",
    status: "",
    hasSucceed: null,
    error: "",
  });
  const [apiResponse, setApiResponse] = useState({});
  const createOrder = () => {
    setIsVissible((prevIsVissible) => ({
      ...prevIsVissible,
      createOrder: false,
      sendPayload: true,
    }));
    axios
      .post(
        "https://giftcardsapidev.azurewebsites.net/api/orders",
        payloadOrder
      )
      .then((res) => {
        setRespuesta(res.data.result);
        console.log(JSON.stringify(res.data.result));

        setPayload((prevPayload) => ({
          ...prevPayload,
          orderId: res.data.object.id,
        }));
      })

      .catch(() => {
        setPayload((prevPayload) => ({
          ...prevPayload,
          error: "Error: Partner inválido.",
        }));
      });
  };

  const sendPayload = () => {
    localStorage.setItem("payload", JSON.stringify(payload));

    setIsVissible({
      createOrder: false,
      sendPayload: false,
    });
    axios
      .post("https://giftcardsapidev.azurewebsites.net/api/payment", payload)
      .then((res) => {
        setIFrame((prevIFrame) => {
          if (res.data.url) {
            return {
              ...prevIFrame,
              url: res.data.url,
              status: res.status,
              hasSucceed: true,
            };
          }
        });
      })
      .catch((err) => {
        setIFrame((prevIFrame) => {
          return {
            ...prevIFrame,
            hasSucceed: false,
            error: "Error: Número de órden no disponible.",
          };
        });
        console.log(err);
      });
  };
  let hadSuccess;

  if (iframe.hasSucceed === true) {
    console.log(iframe.url);

    hadSuccess = window.open(iframe.url, "myFrame");
  } else if (iframe.error) {
    hadSuccess = <p>{iframe.error}</p>;
  }

  const on3DSComplete = () => {
    document.getElementById("payment-iframe").remove();
  };

  window.addEventListener(
    "message",
    function (ev) {
      if (ev.data === "3DS-authentication-complete") {
        on3DSComplete();
        axios
          .post(
            "https://giftcardsapidev.azurewebsites.net/api/payment",
            JSON.parse(localStorage.getItem("payload"))
          )
          .then((dat) => {
            setApiResponse({
              ...dat.data[0],
              src: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${apiResponse.number}`,
            });
          });
      }
    },
    false
  );
  return (
    <div>
      <div className="App">
        <div className={iframe.hasSucceed ? "img oculto" : "img"}>
          <GiftCard />
        </div>

        {isVissible.createOrder && (
          <div>
            <br />
            <button className="create-order" onClick={createOrder}>
              {" "}
              Crear orden{" "}
            </button>
          </div>
        )}

        {payload.error ? <p>{payload.error}</p> : null}

        {respuesta === "Success" ? (
          <div>
            {isVissible.sendPayload && (
              <button className="create-order" onClick={sendPayload}>
                {" "}
                Pagar{" "}
              </button>
            )}
          </div>
        ) : null}
        <br />

        <div className="iframe-container">
          <iframe
            name="myFrame"
            id="payment-iframe"
            title="payment-window"
            width="600px"
            height="500px"
          ></iframe>
        </div>
        <ul className="list">
          <li>
            <strong>uuid:</strong> {JSON.stringify(apiResponse.uuid)}
          </li>
          <li>
            <strong>name:</strong> {JSON.stringify(apiResponse.name)}
          </li>
          <li>
            <strong>amount:</strong> {parseInt(apiResponse.amount)}
            <strong>
              {" "}
              <br />
              Type of:{" "}
            </strong>
            {typeof parseInt(apiResponse.amount)}
          </li>
          <li>
            <strong>
              type:
              <br />
              <br />
            </strong>
            <img src={apiResponse.src} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
