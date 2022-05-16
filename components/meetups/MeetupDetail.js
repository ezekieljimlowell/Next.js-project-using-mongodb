import Styles from "./MeetupDetail.module.css";

export default function MeetupDetail(props) {
    return (
        <section className={Styles.detail}>
            <img src={props.image} alt={props.title}></img>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}
