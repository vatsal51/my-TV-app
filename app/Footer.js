import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

const data = [
  { icon: "bi bi-fire", name: "Trending", link: "/", id: 1 },
  { icon: "bi bi-film", name: "Movies", link: "/movies", id: 2 },
  { icon: "bi bi-tv", name: "TV Series", link: "/tv", id: 3 },
  { icon: "bi bi-search", name: "Search", link: "/search", id: 4 },
];

const Footer = ({ pathname }) => {
  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeButton =
    data.find((item) => {
      const itemPath = item.link === "/" ? "/" : item.link.replace(/\/$/, "");
      return itemPath === normalizedPath;
    })?.id ?? 1;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center bg-dark footer">
          {data.map((Val) => (
            <Link href={Val.link} prefetch={true} key={Val.id}>
              <button
                id={Val.id}
                className={`col-sm-2 col-md-2 btn btn-dark nav-button ${
                  Val.id === activeButton ? "active" : ""
                }`}
              >
                <i className={`${Val.icon}`} id="fire"></i>
                <br />
                <h5 className="pt-1 fs-6">{Val.name}</h5>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
