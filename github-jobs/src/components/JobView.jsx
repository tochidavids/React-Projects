import React from "react";
import "../styles/style.css";

function JobView(props) {
	const { setJobView, currentJob } = props;
	const description = addParagraphs(currentJob.description);
	return (
		<section className="job-view">
			<div className="sidebar">
				<button onClick={() => setJobView(false)}>
					<i className="fa-solid fa-long-arrow-alt-left"></i>
					Back to search
				</button>
				<h2>How to apply</h2>
				<p>Apply {currentJob.via}</p>
				{currentJob.related_links ? <h2>Related links</h2> : ""}
				<ul>
					{currentJob.related_links &&
						currentJob.related_links.map((link, index) => (
							<li key={index}>
								<a href={link.link}>{link.text}</a>
							</li>
						))}
				</ul>
			</div>
			<main>
				<div className="top">
					<h1>{currentJob.title}</h1>
					{currentJob.extensions.includes("Full-time") ? (
						<button className="full-time">Full time</button>
					) : (
						""
					)}
				</div>
				{"posted_at" in currentJob.detected_extensions ? (
					<div className="time">
						<i className="fa-solid fa-clock"></i>
						{currentJob.detected_extensions.posted_at}
					</div>
				) : (
					""
				)}
				<div className="company-info">
					{"thumbnail" in currentJob ? (
						<div className="img-container">
							<img src={currentJob.thumbnail} alt="" />
						</div>
					) : (
						<div className="not-found">
							<p>not found</p>
						</div>
					)}
					<div className="info">
						<h2>{currentJob.company_name}</h2>
						<div className="location">
							<i className="fa-solid fa-globe-americas"></i>
							{currentJob.location}
						</div>
					</div>
				</div>
				<div className="description">{description}</div>
			</main>
		</section>
	);
}

const addParagraphs = text => {
	const list = text.split(/\n/g);
	if (list) {
		return (
			<>{list && list.map((para, index) => <p key={index}>{para}</p>)}</>
		);
	}
	return text;
};

export default JobView;
