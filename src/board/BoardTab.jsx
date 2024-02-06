import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Board() {
    const query = useQuery();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(
                `/api/board/articles?articleCtgr=${query.get("articleCtgr")}`
            );
            setPosts(response.data);
        };
        fetchPosts();
    }, [query.get("articleCtgr")]);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.articleId}>
                    <h2>{post.title}</h2>
                    <p>{post.author}</p>
                </div>
            ))}
        </div>
    );
}

function BoardTab() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/board?articleCtgr=자유게시판">
                                자유게시판
                            </Link>
                        </li>
                        <li>
                            <Link to="/board?articleCtgr=공지사항">
                                공지사항
                            </Link>
                        </li>
                        <li>
                            <Link to="/board?articleCtgr=공고">공고</Link>
                        </li>
                        <li>
                            <Link to="/board?articleCtgr=Q&A">Q&A</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/board">
                        <Board />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default BoardTab;
