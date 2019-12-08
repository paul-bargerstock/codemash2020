import React from "react";
import { Modal, Label, Transition, Button, Icon } from "semantic-ui-react";

export default function SessionModal(props) {
    const handleFavoriteClicked = () => {
        props.handleFavoritesChanged(props.session.id, true);
    };
    
    return (
        <Transition visible={props.visible}>
            <Modal open={props.visible} onClose={props.onClose}>
                <Modal.Header>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            {props.session.title}
                        </div>
                        <div>
                            {props.session.speaker}
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Content>
                    <div style={{ color: "black", paddingTop: "10px", paddingBottom: "10px", fontSize: "110%" }}>
                        {`${props.session.description}`}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {
                            props.session.tags.map(t =>
                                <Label tag color="violet" key={t.id}>{t.name}</Label>
                            )
                        }
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button animated onClick={handleFavoriteClicked}>
                    <Button.Content visible>{props.session.isFavorite ? "Un-Favorite" : "Favorite"}</Button.Content>
                        <Button.Content hidden>
                            <Icon name={props.session.isFavorite ? "heartbeat" : "heart"} color="red" />
                        </Button.Content>
                    </Button>
                </Modal.Actions>
            </Modal>
        </Transition>
    );
};