import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import data from "../data.json";

const style = {
  default: {
    fill: "#fff",
    outline: "none",
  },
  hover: {
    fill: "#fff",
    outline: "none",
  },
};
const error = {
  default: {
    fill: "#ff3860",
    outline: "none",
  },
  hover: {
    fill: "rgba(255, 56, 96, 0.829)",
    outline: "none",
  },
};

const warning = {
  default: {
    fill: "#CF9925",
    outline: "none",
  },
  hover: {
    fill: "rgba(207, 153, 37, 0.863)",
    outline: "none",
  },
};
const info = {
  default: {
    fill: "rgb(68, 155, 226)",
    outline: "none",
  },
  hover: {
    fill: "rgba(68, 155, 226, 0.8)",
    outline: "none",
  },
};
const success = {
  default: {
    fill: "#7CA6C2",
    outline: "none",
  },
  hover: {
    fill: "rgba(124, 166, 194, 0.815)",
    outline: "none",
  },
};

const MapChart = ({ setTooltipContent, world }) => {
  function applyStyle(isoCode) {
    const country = world.list.find(
      (country) => country.country_code === isoCode.toLowerCase()
    );

    if (!country) return style;
    if (!country.confirmed) return style;

    if (country.confirmed > 1000000) {
      return error;
    } else if (country.confirmed > 100000) {
      return warning;
    } else if (country.confirmed < 100000) {
      return success;
    }
  }

  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        width={800}
        height={400}
      >
        <ZoomableGroup>
          <Geographies geography={data}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { ISO_A2, NAME } = geo.properties;
                    const info = world.list.find(
                      (item) => item.country_code === ISO_A2.toLowerCase()
                    );
                    if (info) {
                      setTooltipContent({
                        country: NAME,
                        ...info,
                      });
                    } else {
                      setTooltipContent({
                        country: NAME,
                        country_code: ISO_A2.toLowerCase(),
                        confirmed: -1,
                        recovered: -1,
                        deaths: -1,
                        tests: -1,
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={applyStyle(geo.properties.ISO_A2)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
