import React, { useCallback, useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import axios from "axios";
import ImageSearch from "../components/ImageSearch";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageData = useCallback(async () => {
    try {
      await axios
        .get(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`
        )

        .then((response) => {
          // Handle the response data
          setData(response?.data?.hits);
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    getImageData();
  }, [getImageData]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchTerm={(text) => setSearchTerm(text)} />
      {!loading && data.length === 0 && (
        <h1 className="text-4xl text-center mx-auto mt-32">No images found!</h1>
      )}
      {loading ? (
        <h1 className="text-6xl text-center mx-auto mt-32"> Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data?.map((image) => (
            <ImageCard key={image?.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
