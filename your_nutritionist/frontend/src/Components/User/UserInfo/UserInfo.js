import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./UserInfo.scss";

const UserInfo = (props) => {
	console.log(props);
	return (
		<>
			<div className="user-info-wrapper">
				<div xs="auto" className="user-head-wrapper">
					<div className="user-head">
						<div className="profile-pic shadow" style={{ backgroundImage: "url('" + props.user_info.profilepic + "')" }}>
							{props.logged_in && props.isSelf ? <div className="editable" onClick={props.showProfileEditForm}></div> : null}
						</div>
					</div>
				</div>
				<div className="username-wrapper">
					<div className="username">
						<span className="title">{props.user_info.name}</span>
						<br></br>
						<span className="subtitle">@{props.user_info.username}</span>
						{props.headlineEdit.editing ? (
							<>
								<div xs="auto" md="auto" lg="auto" className="edit-headline-wrapper">
									<Form onSubmit={props.submitHeadline}>
										<textarea value={props.headlineEdit.headline} onChange={props.editHeadlineChangeHandler}></textarea>
										<br></br>
										<Button className="cancel-edit-btn" onClick={props.stopHeadlineEdit}>
											Cancel
										</Button>
										<Button className="submit-edit-btn" type="submit">
											Edit
										</Button>
									</Form>
								</div>
							</>
						) : (
							<>
								<div className="headline-wrapper">
									<div className="headline">
										<span style={{ fontSize: "24pt", fontWeight: "bold" }}>&ldquo;</span>
										{props.user_info.headline}
										{props.logged_in && props.isSelf ? (
											<Button onClick={props.startHeadlineEdit} className="edit-intro-btn">
												&nbsp;<i class="material-icons">edit</i>
											</Button>
										) : null}
									</div>
								</div>
							</>
						)}

						{console.log(props.user_info)}
						{props.logged_in && !props.isSelf ? (
							props.user_info.following == false ? (
								<Button className="follow-btn" onClick={props.follow}>
									Follow
								</Button>
							) : (
								<Button className="following-btn" onClick={props.unfollow}>
									Following
								</Button>
							)
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;
