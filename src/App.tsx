import { useEffect, useState } from "react";
import axios from "axios";
import { Box, ImageList, ImageListItem } from "@mui/material";

interface ApiData {
  id: string;
  urls: {
    small: string;
  };
}

const App = () => {
  const [images, setImages] = useState<ApiData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);

    const res = await axios.get<ApiData[]>(
      `https://api.unsplash.com/photos?client_id=tyNB_mcZBIXWIoY1GskCrE2tO9KqBW7RUc03lbLoCeM&page=${page}&per_page=10`
    );

    setImages((prev) => [...prev, ...res.data]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      {" "}
      <ImageList variant="masonry" cols={6} gap={10} sx={{ padding: "10px" }}>
        {" "}
        {images.map((val, index) => (
          <ImageListItem key={index} sx={{ overflow: "hidden" }}>
            {" "}
            <img
              src={val.urls.small}
              loading="lazy"
              style={{ borderRadius: 10, display: "block" }}
            />{" "}
          </ImageListItem>
        ))}{" "}
      </ImageList>{" "}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}{" "}
    </Box>
  );
};

export default App;
