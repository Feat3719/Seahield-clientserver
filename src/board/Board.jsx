import React, {useState, useEffect} from "react";
import style from "./Board.module.css";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";

function Board() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      };
      fetchData();
    }, []);
  
    console.log(posts);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
      let currentPosts = 0;
      currentPosts = posts.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    };


    return (
        <div className="wrapper">
            <div className="list-wrapper">
                <div className="list">
                    <table>
                        <thead>
                            <tr>
                                <th>userId</th>
                                <th>id</th>
                                <th>title</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <Posts posts={currentPosts(posts)} loading={loading}></Posts>
                            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage}></Pagination>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    );
}

export default Board;
