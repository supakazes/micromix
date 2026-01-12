import { useState } from "react";
import postsData from "../data/posts.json";

const Posts = () => {
  const [audioErrors, setAudioErrors] = useState<Set<number>>(new Set());

  const handleAudioError = (index: number) => {
    setAudioErrors((prev) => new Set(prev).add(index));
  };

  return (
    <div>
      <h1>Micromix Posts</h1>
      {postsData.map((post, index) => (
        <article
          key={index}
          style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}
        >
          <h2>
            {post.number} - {post.title}
          </h2>
          <p>
            <strong>Mixed by:</strong> {post.creator}
          </p>
          <p>
            <strong>Published:</strong> {new Date(post.pubDate).toLocaleDateString()}
          </p>

          {post.imagePost && (
            <img
              src={post.imagePost}
              alt={post.title}
              style={{ maxWidth: "300px", height: "auto" }}
              loading="lazy"
            />
          )}

          {!audioErrors.has(index) ? (
            <audio
              controls
              style={{ width: "100%", marginTop: "1rem" }}
              onError={() => handleAudioError(index)}
            >
              <source
                src={`/audio/Micromix%20${post.number}%20-%20${encodeURIComponent(post.title)}.mp3`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p style={{ marginTop: "1rem", color: "#666", fontStyle: "italic" }}>
              Audio file not available
            </p>
          )}

          {post.tracklist && post.tracklist.length > 0 && (
            <details style={{ marginTop: "1rem" }}>
              <summary>Tracklist ({post.tracklist.length} tracks)</summary>
              <ol>
                {post.tracklist.map((track, i) => (
                  <li key={i}>
                    {typeof track === "string" ? track : `${track.artist} - ${track.trackname}`}
                  </li>
                ))}
              </ol>
            </details>
          )}

          <a href={post.link} target="_blank" rel="noopener noreferrer">
            View original post →
          </a>
        </article>
      ))}
    </div>
  );
};

export default Posts;
