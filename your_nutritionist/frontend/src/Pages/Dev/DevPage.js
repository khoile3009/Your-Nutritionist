import React, { Component } from "react";
import "../../../node_modules/video-react/dist/video-react.css";
import { Container } from "react-bootstrap";
import MediaUploadContainer from "../../Containers/Util/MediaUpload/MediaUploadContainer";
import "../../_global-theme.scss";

class DevPage extends Component {
	constructor(props) {
		super(props);
	}

	setMedia = (medias, files) => {
		this.setState({ medias: medias, files: files }, () => {
			console.log(this.state);
		});
	};

	render() {
		return (
			<>
				<div className="dev-wrapper">
					<h1 className="primary-txt">Heading 1</h1>
					<p className="secondary-txt">
						涙流すことすら無いまま 過ごした⽇々の痕⼀つも残さずに さよならだ
						⼀⼈で迎えた朝に 鳴り響く誰かの⾳ ⼆⼈で過ごした部屋で
						⽬を閉じたまま考えてた 悪いのは誰だ 分かんないよ 誰のせいでもない たぶん
						僕らは何回だってきっと そう何年だってきっと さよならと共に終わるだけなんだ
						仕⽅がないよきっと 「おかえり」 思わず零れた⾔葉は 違うな ⼀⼈で迎えた朝に
						ふと想う誰かのこと ⼆⼈で過ごした⽇々の 当たり前がまだ残っている
						悪いのは君だ そうだっけ 悪いのは僕だ たぶん これも⼤衆的恋愛でしょ
						それは最終的な答えだよ 僕らだんだんとズレていったの
						それもただよくある聴き慣れたストーリーだ あんなに輝いていた⽇々にすら
						埃は積もっていくんだ 僕らは何回だってきっと そう何年だってきっと
						さよならに続く道を歩くんだ 仕⽅がないよきっと 「おかえり」 いつもの様に
						零れ落ちた 分かり合えないことなんてさ 幾らでもあるんだきっと
						全てを許し合えるわけじゃないから ただ、優しさの⽇々を
						⾟い⽇々と感じてしまったのなら 戻れないから 僕らは何回だってきっと
						僕らは何回だってきっと そう何年だってきっと さよならと共に終わるだけなんだ
						仕⽅がないよきっと 「おかえり」 思わず零れた⾔葉は 違うな
						それでも何回だってきっと そう何年だってきっと 始まりに戻ることが出来たなら
						なんて、思ってしまうよ 「おかえり」 届かず零れた⾔葉に 笑った 少し冷えた朝だ
						https://lyricstranslate.com/en/tabun-probably.html
					</p>
				</div>
				{/* <Container>
					<MediaUploadContainer setMedia={this.setMedia} />
				</Container> */}
			</>
		);
	}
}

export default DevPage;
