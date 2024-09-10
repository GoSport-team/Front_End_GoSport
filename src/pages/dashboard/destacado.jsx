import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
export function JugadorDestacado() {
  return (
    <div className="flex max-w-screen-lg flex-col gap-8">
          <Typography variant="h5" color="blue-gray">
            Jugadores Destacados SENA !
          </Typography>
    </div>
  );
}

export default JugadorDestacado;
