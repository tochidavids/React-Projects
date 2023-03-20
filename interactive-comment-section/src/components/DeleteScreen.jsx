import React from "react";
import { deleteComment } from "..";

function DeleteScreen({ commentId, setOnDeleteScreen }) {
	const handleSubmit = () => {
		window.location.reload();
		deleteComment(commentId);
		setOnDeleteScreen(false);
	};

	return (
		<form className="delete" id="delete" onSubmit={handleSubmit}>
			<div className="delete-container">
				<h1>Delete comment</h1>
				<p>
					Are you sure you want to delete this comment? This will
					remove the comment and this can't be undone.
				</p>
				<div className="btns">
					<button
						type="button"
						className="cancel"
						onClick={() => setOnDeleteScreen(false)}
					>
						No, cancel
					</button>
					<button type="submit" form="delete" className="delete">
						Yes, delete
					</button>
				</div>
			</div>
		</form>
	);
}

export default DeleteScreen;
