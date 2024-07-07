import { Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import axios from "axios";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const DisplayData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 130 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "body", headerName: "Body", width: 500 },
  ];
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Posts from JSONPlaceholder API
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          autoPageSize
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default DisplayData;
