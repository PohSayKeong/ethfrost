// components/SwapComponent.tsx
import { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";

export interface Token {
  name: string;
  symbol: string;
}

interface SwapComponentProps {
  tokens: Token[];
  tokenFrom: Token;
  tokenTo: Token;
  onTokenFromChange: (token: Token) => void;
  onTokenToChange: (token: Token) => void;
}

const SwapComponent: React.FC<SwapComponentProps> = ({
  tokens,
  tokenFrom,
  tokenTo,
  onTokenFromChange,
  onTokenToChange,
}) => {
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const handleSwap = () => {
    console.log("Swapping...");
  };

  const handleTokenFromChange = (symbol: string) => {
    const token = tokens.find((token) => token.symbol === symbol);
    if (token) {
      onTokenFromChange(token);
    }
  };

  const handleTokenToChange = (symbol: string) => {
    const token = tokens.find((token) => token.symbol === symbol);
    if (token) {
      onTokenToChange(token);
    }
  };

  return (
    <div>
      <Select
        value={tokenFrom.symbol}
        onChange={(e) => handleTokenFromChange(e.target.value)}
      >
        {tokens.map((token) => (
          <MenuItem key={token.symbol} value={token.symbol}>
            {token.symbol}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={amountFrom}
        onChange={(e) => setAmountFrom(e.target.value)}
        placeholder="0.0"
      />

      <Select
        value={tokenTo.symbol}
        onChange={(e) => handleTokenToChange(e.target.value)}
      >
        {tokens.map((token) => (
          <MenuItem key={token.symbol} value={token.symbol}>
            {token.symbol}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={amountTo}
        onChange={(e) => setAmountTo(e.target.value)}
        placeholder="0.0"
      />

      <Button onClick={handleSwap}>Swap</Button>
    </div>
  );
};

export default SwapComponent;
