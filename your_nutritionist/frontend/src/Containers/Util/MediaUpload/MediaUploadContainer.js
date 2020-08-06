<<<<<<< Updated upstream
import React, { Component } from 'react'
import './MediaUploadContainer.css'
import $ from 'jquery'
import TabList from '../../../Components/Util/TabList/TabList'
import MediaInput from './MediaInput/MediaInput'
import MediaPreviewList from './MediaPreviewList/MediaPreviewList'
class MediaUploadContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            medias: [],
            active: 0,
            current: 0,
        }
        this.tabs = ['Image url', 'Image file', 'Youtube url', 'Video file']
        this.switchTab = this.switchTab.bind(this)
        this.getCurrentFile = this.getCurrentFile.bind(this)
    }

    switchTab = (index) => {
        console.log(index)
        this.setState({ active: index })
    }

    submitNewImageFile = (event) => {
        if (event.target.files && event.target.files.length)
            var getImagePath = URL.createObjectURL(event.target.files[0])
        $(".file-preview").css('background-image', 'url(' + getImagePath + ')');
    }

    sendBackData = () => {
        let files = []
        let medias = this.state.medias.map(
            (media, index) => {
                if (media.type == 1 || media.type == 3) {
                    files.push(this.state.files[index])
                    return {
                        ...media,
                        fileId: files.length - 1,
                        url: ''
                    }
                }
                else {
                    return {
                        ...media,
                        fileId: -1
                    }
                }
            }
        )
        this.props.setMedia(medias, files)
    }

=======
import React, { Component } from "react";
import "./MediaUploadContainer.scss";
import $ from "jquery";
import TabList from "../../../Components/Util/TabList/TabList";
import MediaInput from "./MediaInput/MediaInput";
import MediaPreviewList from "./MediaPreviewList/MediaPreviewList";
class MediaUploadContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			medias: [],
			active: 0,
			current: 0,
		};
		this.tabs = ["Image url", "Image file", "Youtube url", "Video file"];
		this.switchTab = this.switchTab.bind(this);
		this.getCurrentFile = this.getCurrentFile.bind(this);
	}

	switchTab = (index) => {
		console.log(index);
		this.setState({ active: index });
	};

	submitNewImageFile = (event) => {
		if (event.target.files && event.target.files.length)
			var getImagePath = URL.createObjectURL(event.target.files[0]);
		$(".file-preview").css("background-image", "url(" + getImagePath + ")");
	};

	getCurrentMedia = () => {
		return this.state.current == this.state.medias.length
			? null
			: this.state.medias[this.state.current];
	};
>>>>>>> Stashed changes

	changeCurrentMedia = (current) => {
		this.switchTab(current == this.state.medias.length ? 0 : this.state.medias[current].type);
		this.setState({ current: current });
	};

<<<<<<< Updated upstream
    getCurrentMedia = () => {
        return this.state.current == this.state.medias.length
            ? null
            : this.state.medias[this.state.current]
    }

    changeCurrentMedia = (current) => {
        this.switchTab(current == this.state.medias.length ? 0 : this.state.medias[current].type)
        this.setState({ current: current })
    }

    addMedia = (media, file) => {
        let medias = this.state.medias
        let files = this.state.files
        if (this.state.current == this.state.medias.length) {
            medias.push(media)
            files.push(file)

        }
        else {
            files[this.state.current] = file
            medias[this.state.current] = media
        }

        this.setState({ files: files, medias: medias, current: medias.length },this.sendBackData)
    }

    getCurrentFile = () => {
        if (this.state.current == this.state.medias.length) {
            return null
        }
        else {
            return this.state.files[this.state.current]
        }
    }

    render() {
        console.log(this.state.files)
        console.log(this.state.medias)
        return <div>
            <TabList
                active={this.state.active}
                tabs={this.tabs}
                switchTab={this.switchTab}
            />
            <MediaInput
                key={this.state.current}
                current={this.state.current}
                addMedia={this.addMedia}
                media={this.getCurrentMedia()}
                file={this.getCurrentFile()}
                active={this.state.active}
                currentFileId={this.state.files.length} />
            <MediaPreviewList medias={this.state.medias} changeCurrentMedia={this.changeCurrentMedia} current={this.state.current} />
        </div>
    }
=======
	addMedia = (media, file) => {
		let medias = this.state.medias;
		let files = this.state.files;
		if (this.state.current == this.state.medias.length) {
			medias.push(media);
			files.push(file);
		} else {
			files[this.state.current] = file;
			medias[this.state.current] = media;
		}

		this.setState({ files: files, medias: medias, current: medias.length });
	};

	getCurrentFile = () => {
		if (this.state.current == this.state.medias.length) {
			return null;
		} else {
			return this.state.files[this.state.current];
		}
	};

	render() {
		console.log(this.state.files);
		console.log(this.state.medias);
		return (
			<div className="media-preview-wrapper">
				<TabList active={this.state.active} tabs={this.tabs} switchTab={this.switchTab} />
				<MediaInput
					current={this.state.current}
					addMedia={this.addMedia}
					media={this.getCurrentMedia()}
					file={this.getCurrentFile()}
					active={this.state.active}
					currentFileId={this.state.files.length}
				/>
				<div className="media-preview-list-wrapper">
					<MediaPreviewList
						medias={this.state.medias}
						changeCurrentMedia={this.changeCurrentMedia}
						current={this.state.current}
					/>
				</div>
			</div>
		);
	}
>>>>>>> Stashed changes
}

export default MediaUploadContainer;
