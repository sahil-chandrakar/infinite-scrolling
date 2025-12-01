import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";

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
  const [error, setError] = useState<unknown>();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<ApiData[]>(
        `https://api.unsplash.com/photos?client_id=tyNB_mcZBIXWIoY1GskCrE2tO9KqBW7RUc03lbLoCeM&page=${page}&per_page=20`
      );

      setImages((prev) => [...prev, ...res.data]);
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
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
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          margin: "15px 0",
          fontWeight: "700",
        }}
      >
        Infinite Scrolling
      </Typography>
      <ImageList cols={6} gap={10} sx={{ padding: "10px" }}>
        {images.map((val, index) => (
          <ImageListItem key={index} sx={{ overflow: "hidden" }}>
            <img
              src={val.urls.small}
              loading="lazy"
              style={{ borderRadius: 10, display: "block" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </Box>
  );
};

export default App;
