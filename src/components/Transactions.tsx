import { Text, Link, Row, Spacer } from "@nextui-org/react";
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
            <Row
              align="center"
              justify="space-between"
              key={index}
              style={{ padding: "2rem" }}
            >
              <Text h4 style={{ marginBottom: "0px" }}>
                {index + 1}.
              </Text>
              <Spacer x={2} />
              <Link
                href={text}
                isExternal
                target="_blank"
                style={{ flexGrow: "1", overflowWrap: "anywhere" }}
              >
                {text}
              </Link>
            </Row>
          ))}
        </>
      ) : (
        <Row align="center" justify="center" style={{ padding: "2rem" }}>
          <Text h3 b>
            No Past Transactions!
          </Text>
        </Row>
      )}
    </>
  );
};

export default TransactionComponent;
