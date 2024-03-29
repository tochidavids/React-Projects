import React, { useRef } from "react";
import {
	user,
	addTopLevelComment,
	addReplyToTopLevelComment,
	addReplyToReply,
	editComment,
} from "..";

function AddComment({ comment, commentIndex, isReply, isEdit }) {
	const textareaRef = useRef();

	const handleSubmit = event => {
		event.preventDefault();
		if (
			textareaRef.current.innerHTML === "" ||
			(isReply && textareaRef.current.innerHTML.split(" ").length < 2)
		)
			return null;
		window.location.reload();

		if (!isReply) {
			addTopLevelComment(textareaRef.current.innerHTML);
			textareaRef.current.innerHTML = "";
		} else if (!isEdit) {
			if ("replyingTo" in comment)
				addReplyToReply(comment.id, textareaRef.current.innerHTML);
			else
				addReplyToTopLevelComment(
					commentIndex,
					textareaRef.current.innerHTML,
				);
			textareaRef.current.innerHTML = `@${comment.user.username}`;
		} else
			editComment(
				comment,
				"replyingTo" in comment ? true : false,
				textareaRef.current.innerHTML,
			);
	};

	return (
		<form className="text-box" onSubmit={handleSubmit}>
			<img src={require(`../images/avatars/${user.image.png}`)} alt="" />
			<div
				className="textarea"
				ref={textareaRef}
				contentEditable
				suppressContentEditableWarning
			>
				{isEdit ? (
					comment.replyingTo ? (
						<>@{comment.user.username + " " + comment.content}</>
					) : (
						comment.content
					)
				) : isReply ? (
					<>@{comment.user.username}</>
				) : (
					""
				)}
			</div>
			{isEdit ? (
				<input type="submit" value="UPDATE" className="submit" />
			) : (
				<input type="submit" value="SEND" className="submit" />
			)}
		</form>
	);
}

export default AddComment;
