import { useState, useMemo } from "react";
import postsData from "../data/posts.json";

// Import all images from public/images directory
const imageModules = import.meta.glob("/public/images/*{jpg,jpeg,png,gif}", {
  eager: true,
  as: "url",
});

const Posts = () => {
  // Create a map of posts numbers to images URLs
  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    Object.entries(imageModules).forEach(([path, url]) => {
      // Extract the number from the filename (e.g., "002" from "/public/images/002.jpg")
      const match = path.match(/\/(\d+)\.\w+$/);
      if (match) {
        map[match[1]] = url as string;
      }
    });
    return map;
  }, []);
  const [audioErrors, setAudioErrors] = useState<Set<number>>(new Set());

  const sanitizeFilename = (filename: string) => {
    // Remove Windows-forbidden characters: ? < > : " | \ / *
    return filename.replace(/[?<>:"|\\/*]/g, "");
  };

  const handleAudioError = (index: number) => {
    setAudioErrors((prev) => new Set(prev).add(index));
  };

  return (
    <div>
      {postsData.map((post, postIndex) => {
        const audioName = sanitizeFilename(`Micromix ${post.number} - ${post.title}`);
        const audioPath = `/audio/${audioName}.mp3`;
        return (
          <article
            key={postIndex}
            style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd" }}
          >
            <h3>
              {post.number} - {post.title}
            </h3>
            <p>
              <strong>Mixed by:</strong> {post.creator}
            </p>
            <p>
              <strong>Published:</strong> {new Date(post.pubDate).toLocaleDateString()}
            </p>

            {imageMap[post.number] && (
              <img
                src={imageMap[post.number]}
                alt={post.title}
                style={{ maxWidth: "300px", height: "auto" }}
                loading="lazy"
              />
            )}

            {!audioErrors.has(postIndex) ? (
              <audio
                controls
                style={{ width: "100%", marginTop: "1rem" }}
                onError={() => handleAudioError(postIndex)}
              >
                <source src={audioPath} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p style={{ marginTop: "1rem", color: "#666", fontStyle: "italic" }}>
                Audio file not available
                <br />
                {audioName}
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
          </article>
        );
      })}
    </div>
  );
};

export default Posts;
