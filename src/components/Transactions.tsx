import { Card, Text, Link, Row, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";

const TransactionComponent = () => {
  const [transactions, setTransactions] = useState<string[]>([]);

  useEffect(() => {
    const storedJsonString = localStorage.getItem("transactions");

    let storedArray = [];

    if (storedJsonString) {
      storedArray = JSON.parse(storedJsonString);
    }
    setTransactions(storedArray);
  }, []);
  return (
    <>
      {transactions.length > 0 ? (
        <>
          {transactions.map((text, index) => (
            <Card
              key={index}
              css={{
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Card.Body>
                <Row align="center" justify="center">
                  <Text h4>{index + 1}.</Text>
                  <Spacer x={2} />
                  <Link href={text} isExternal target="_blank">
                    Transaction Link
                  </Link>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <Card
          css={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Card.Body>
            <Text>No Past Transactions!</Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default TransactionComponent;
