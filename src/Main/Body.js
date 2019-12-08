import React from "react";
import { Grid, Icon, Dimmer, Loader, Segment } from "semantic-ui-react";

export default function Body(props) {
    const handleFavoritesChanged = (fav) => {
        props.handleFavoritesChanged(fav);
    };

    const handleSessionDetailsClicked = id => ({ target }) => {
        // Ignore the icon
        if (!target.classList.contains("heart"))
            props.handleSessionDetailsClicked(id);
    };

    const segmentStyle = {
        color: "white",
        backgroundColor: "#111",
        width: "100%",
        cursor: "pointer"
    }

    return (
        <React.Fragment>
            {
                props.isLoading ?
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                    :
                    <Grid style={{ paddingRight: "50px", paddingLeft: "50px" }} stackable>
                        <Grid.Row>
                            {
                                props.tuesday.length > 0 ?
                                    <Grid.Column computer={4} tablet={16} mobile={16}>
                                        <Grid padded>
                                            <Grid.Row>
                                                <Grid.Column textAlign="center">
                                                    <p style={{ fontSize: "125%", color: "white" }}>Tuesday (PreCompilers)</p>
                                                </Grid.Column>
                                            </Grid.Row>
                                            {
                                                props.tuesday.map(session =>
                                                    <Segment key={session.id} style={segmentStyle} onClick={handleSessionDetailsClicked(session.id)}>
                                                        <Grid.Row key={session.id}>
                                                            <Grid.Column width={16}>
                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                    <div style={{ fontSize: "115%" }}>
                                                                        {session.title}
                                                                    </div>
                                                                    <div style={{ paddingLeft: "5px" }}>
                                                                        <Icon name="heart" color={session.isFavorite ? "red" : "grey"} style={{ cursor: "pointer" }} onClick={() => { handleFavoritesChanged(session.id) }} />
                                                                    </div>
                                                                </div>
                                                                <div style={{ color: "#a879fd" }}>
                                                                    {session.speaker}
                                                                </div>
                                                                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems: "center", color: "#21ba45" }}>
                                                                    <div>
                                                                        {`${session.day} - ${session.time}`}
                                                                    </div>
                                                                    <div>
                                                                        {session.room}
                                                                    </div>
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Segment>
                                                )
                                            }
                                        </Grid>
                                    </Grid.Column>
                                    : null
                            }
                            {
                                props.tuesday.length > 0 ?
                                    <Grid.Column computer={4} tablet={16} mobile={16}>
                                        <Grid padded>
                                            <Grid.Row>
                                                <Grid.Column textAlign="center">
                                                    <p style={{ fontSize: "125%", color: "white" }}>Wednesday (PreCompilers)</p>
                                                </Grid.Column>
                                            </Grid.Row>
                                            {
                                                props.wednesday.map(session =>
                                                    <Segment key={session.id} style={segmentStyle} onClick={handleSessionDetailsClicked(session.id)}>
                                                        <Grid.Row key={session.id}>
                                                            <Grid.Column width={16}>
                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                    <div style={{ fontSize: "115%" }}>
                                                                        {session.title}
                                                                    </div>
                                                                    <div style={{ paddingLeft: "5px" }}>
                                                                        <Icon name="heart" color={session.isFavorite ? "red" : "grey"} style={{ cursor: "pointer" }} onClick={() => { handleFavoritesChanged(session.id) }} />
                                                                    </div>
                                                                </div>
                                                                <div style={{ color: "#a879fd" }}>
                                                                    {session.speaker}
                                                                </div>
                                                                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems: "center", color: "#21ba45" }}>
                                                                    <div>
                                                                        {`${session.day} - ${session.time}`}
                                                                    </div>
                                                                    <div>
                                                                        {session.room}
                                                                    </div>
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Segment>
                                                )
                                            }
                                        </Grid>
                                    </Grid.Column>
                                    : null
                            }
                            <Grid.Column computer={props.tuesday.length > 0 ? 4 : 8} tablet={16} mobile={16}>
                                <Grid padded>
                                    <Grid.Row>
                                        <Grid.Column textAlign="center">
                                            <p style={{ fontSize: "125%", color: "white" }}>Thursday</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                    {
                                        props.thursday.map(session =>
                                            <Segment key={session.id} style={segmentStyle} onClick={handleSessionDetailsClicked(session.id)}>
                                                <Grid.Row key={session.id}>
                                                    <Grid.Column width={16}>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                            <div style={{ fontSize: "115%" }}>
                                                                {session.title}
                                                            </div>
                                                            <div style={{ paddingLeft: "5px" }}>
                                                                <Icon name="heart" color={session.isFavorite ? "red" : "grey"} style={{ cursor: "pointer" }} onClick={() => { handleFavoritesChanged(session.id) }} />
                                                            </div>
                                                        </div>
                                                        <div style={{ color: "#a879fd" }}>
                                                            {session.speaker}
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems: "center", color: "#21ba45" }}>
                                                            <div>
                                                                {`${session.day} - ${session.time}`}
                                                            </div>
                                                            <div>
                                                                {session.room}
                                                            </div>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Segment>
                                        )
                                    }
                                </Grid>
                            </Grid.Column>
                            <Grid.Column computer={props.tuesday.length > 0 ? 4 : 8} tablet={16} mobile={16}>
                                <Grid padded>
                                    <Grid.Row>
                                        <Grid.Column textAlign="center">
                                            <p style={{ fontSize: "125%", color: "white" }}>Friday</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                    {
                                        props.friday.map(session =>
                                            <Segment key={session.id} style={segmentStyle} onClick={handleSessionDetailsClicked(session.id)}>
                                                <Grid.Row key={session.id}>
                                                    <Grid.Column width={16}>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                            <div style={{ fontSize: "115%" }}>
                                                                {session.title}
                                                            </div>
                                                            <div style={{ paddingLeft: "5px" }}>
                                                                <Icon name="heart" color={session.isFavorite ? "red" : "grey"} style={{ cursor: "pointer" }} onClick={() => { handleFavoritesChanged(session.id) }} />
                                                            </div>
                                                        </div>
                                                        <div style={{ color: "#a879fd" }}>
                                                            {session.speaker}
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems: "center", color: "#21ba45" }}>
                                                            <div>
                                                                {`${session.day} - ${session.time}`}
                                                            </div>
                                                            <div>
                                                                {session.room}
                                                            </div>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Segment>
                                        )
                                    }
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            }
        </React.Fragment>
    );
};