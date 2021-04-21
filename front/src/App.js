import { Fragment, useEffect, useRef, useState } from "react"
import Card from "./components/Card"
import MenuIcon from "./components/icons/MenuIcon"
import "./App.scss"

export default function () {
    const [articleId, setArticleId] = useState(null)
    const [article, setArticle] = useState(null)

    useEffect(() => {
        ;(async () => {
            const response = await fetch("/api/articles")
            const homeArticle = await response.json()
            setArticleId(homeArticle._id)
        })()
    }, [])

    useEffect(() => {
        if (articleId) {
            ;(async () => {
                const response = await fetch(`/api/articles/${articleId}`)
                const article = await response.json()
                setArticle(article)
            })()
        }
    }, [articleId])

    function goToRelatedArticle(relatedArticleId) {
        setArticle(null)
        setArticleId(relatedArticleId)
    }

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const menu = useRef()

    function handleClickOnMenu() {
        if (isAnimating) return

        if (!menuIsOpen) {
            menu.current.classList.add("show-menu")
            setIsAnimating(true)
            const openMenu = setTimeout(() => {
                clearTimeout(openMenu)
                setIsAnimating(false)
            }, 500)
            return setMenuIsOpen(true)
        }

        menu.current.style.animation = "0.5s slide-out-menu forwards"
        setIsAnimating(true)
        const closeMenu = setTimeout(() => {
            clearTimeout(closeMenu)
            menu.current.classList.remove("show-menu")
            menu.current.style.animation = null
            setMenuIsOpen(false)
            setIsAnimating(false)
        }, 500)
    }

    if (!article)
        return (
            <div className="loading">
                <h1>
                    Loading
                    <span className="dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </h1>
            </div>
        )

    return (
        <Fragment>
            <header>
                <nav>
                    <a className="brand" href="/">
                        <span>Game R</span>epo
                    </a>
                    <div className="menu" onClick={handleClickOnMenu}>
                        <MenuIcon />
                    </div>
                    <ul ref={menu}>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Contact</a>
                        </li>
                        <li>
                            <a href="/">About</a>
                        </li>
                    </ul>
                </nav>
                <div className="header-bg">
                    <img src={article.imageUrl} />
                    <div />
                </div>
                <h1 className="article-title">{article.title}</h1>
            </header>
            <main>
                <div className="article-description" dangerouslySetInnerHTML={{ __html: article.description }} />
                <div className="related-articles">
                    <h1>Related Articles</h1>
                    <div className="separator" />
                    <div className="cards">
                        {article.relatedArticles.map((ra) => {
                            return <Card key={ra._id} relatedArticle={ra} goToRelatedArticle={goToRelatedArticle} />
                        })}
                    </div>
                </div>
            </main>
            <footer>
                <div className="copy-right">
                    <p>Designed And Developed By UVA</p>
                    <div className="footer-links">
                        <a href="http://uva01.vercel.app">Portfolio</a>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
