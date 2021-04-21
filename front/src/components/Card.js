import ViewIcon from "./icons/ViewIcon"
import CommentIcon from "./icons/CommentIcon"

export default function({ relatedArticle, goToRelatedArticle }) {
    const { _id, title, thumbnailUrl, category, commentCount } = relatedArticle
    let viewCount = relatedArticle.viewCount
    if (viewCount / 1000 >= 1) viewCount = `${(viewCount / 1000).toFixed(1)}k`

    function handleClickOnRelatedArticle() {
        window.scrollTo(0, 0)
        goToRelatedArticle(_id)
    }

    return (
        <div className="card" onClick={handleClickOnRelatedArticle}>
            <div className="card-image">
                <img src={thumbnailUrl} />
            </div>
            <h1>{title}</h1>
            <div className="card-details">
                <span className="category">{category.title}</span>
                <span className="view-count"><ViewIcon/> {viewCount}</span>
                <span className="comment-count"><CommentIcon/> {commentCount}</span>
            </div>
        </div>
    )
}