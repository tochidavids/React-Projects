import React, { useState, useEffect } from "react";
import Replies from "./Replies";
import AddComment from "./AddComment";
import DeleteScreen from "./DeleteScreen";
import {
	user,
	addToCommentScore,
	substractFromCommentScore,
	getTimeAgo,
} from "..";

function Comments({ comment, index }) {
	const [showReplyForm, setShowReplyForm] = useState({});
	const [isEditButton, setIsEditButton] = useState({});
	const [onDeleteScreen, setOnDeleteScreen] = useState(false);

	const [reload, setReload] = useState(false);

	useEffect(() => {
		if (reload) setReload(false);
	}, [reload]);

	const replyButtonClicked = (key, editButton) => {
		setShowReplyForm(old => ({ ...old, [key]: !old[key] }));
		if (editButton) setIsEditButton(old => ({ ...old, [key]: true }));
	};

	const relativeTimeCreated = getTimeAgo(comment.createdAt);

	return (
		<>
			<li className="comment" key={index}>
				<div className="score">
					<i
						className="fas fa-plus"
						onClick={() => {
							addToCommentScore(comment);
							setReload(true);
						}}
					></i>
					<div className="value">{comment.score}</div>
					<i
						className="fas fa-minus"
						onClick={() => {
							substractFromCommentScore(comment);
							setReload(true);
						}}
					></i>
				</div>
				<section>
					<div className="top">
						<div className="left">
							<img
								src={require(`../images/avatars/${comment.user.image.png}`)}
								alt=""
							/>
							<h6 className="username">
								{comment.user.username}
								<br />
								{user.username === comment.user.username ? (
									<div className="you-tag">you</div>
								) : (
									""
								)}
							</h6>
							<p className="time">{relativeTimeCreated}</p>
						</div>
						<div className="right">
							{user.username === comment.user.username ? (
								<>
									<button
										className="delete"
										onClick={() => setOnDeleteScreen(true)}
									>
										<i className="fas fa-trash"></i>
										Delete
									</button>
									<button
										className="edit"
										onClick={() =>
											replyButtonClicked(index, true)
										}
									>
										<i className="fas fa-pen"></i>
										Edit
									</button>
								</>
							) : (
								<button
									className="reply"
									onClick={() => replyButtonClicked(index)}
								>
									<i className="fas fa-reply"></i>
									Reply
								</button>
							)}
						</div>
					</div>
					<p className="content">
						{comment.replyingTo ? (
							<i className="replying-to">
								@{comment.replyingTo}{" "}
							</i>
						) : (
							""
						)}
						{comment.content}
					</p>
				</section>
			</li>

			{showReplyForm[index] ? (
				<AddComment
					comment={comment}
					commentIndex={index}
					isReply={true}
					isEdit={isEditButton[index] ? true : false}
				/>
			) : (
				""
			)}

			{comment.replies && comment.replies.length > 0 ? (
				<Replies comment={comment} />
			) : (
				""
			)}

			{onDeleteScreen ? (
				<DeleteScreen
					comment={comment}
					setOnDeleteScreen={setOnDeleteScreen}
				/>
			) : (
				""
			)}
		</>
	);
}

export default Comments;
