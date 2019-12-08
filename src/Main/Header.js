import React, { useState, useEffect } from "react";
import { Grid, Icon, Image, Button, Form, Segment, Popup } from "semantic-ui-react";
import CodeMashIcon from './codemash-logo.png';

export default function Header(props) {
    const [filter, setFilter] = useState({ showPrecompilers: true, onlyFavorites: false, tags: [] });

    const handleFilters = name => e => {
        setFilter({ ...filter, [name]: !filter[name] });
    };

    const handleTagsChanged = (e, { value }) => {
        setFilter({ ...filter, tags: value });
    };
    
    const getLink = () => {
        props.handleGetLink();                
    };

    useEffect(() => {
        props.handleFilters(filter);
    },[filter]);

    return (
        <Grid>
            {/* Desktop */}
            <Grid.Row only="computer">
                <Grid.Column width={16}>
                    <Segment style={{ backgroundColor: "lightGray", borderBottom: "5px solid grey" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Image src={CodeMashIcon} size="tiny" />
                                <p style={{ fontSize: "150%", color: "black", fontWeight: "bold" }}>CodeMash 2020 - Session Picker</p>
                            </div>
                            <Form style={{width: "50%"}}>
                                <Form.Group style={{justifyContent: "flex-end", alignItems: "center"}}>
                                    <Form.Field>
                                        <Form.Checkbox
                                            label="Show Precompilers"
                                            onChange={handleFilters("showPrecompilers")}
                                            checked={filter.showPrecompilers}
                                            slider
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Checkbox
                                            label="Favorites Only"
                                            onChange={handleFilters("onlyFavorites")}
                                            checked={filter.onlyFavorites}
                                            slider
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Popup content="Share this list!" trigger={
                                            <Form.Button icon onClick={getLink}>
                                            <Icon color="green" name="linkify" />
                                        </Form.Button>
                                        } position="left center"/>                                        
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field width={16}>
                                        <Form.Dropdown
                                            label="Tags:"
                                            options={props.tags}
                                            onChange={handleTagsChanged}
                                            multiple
                                            selection
                                            fluid
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid.Row>

            {/* Mobile */}
            <Grid.Row only="tablet mobile" style={{padding: 0}} centered>
                <div style={{width: "100%"}}>
                    <Segment style={{ backgroundColor: "lightGray"}}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "15px" }}>
                            <Image src={CodeMashIcon} size="mini" />
                            <p style={{ fontSize: "125%", color: "black", fontWeight: "bold" }}>CodeMash 2020 - Session Picker</p>
                            <Button icon onClick={getLink}>
                                <Icon color="green" name="linkify" />
                            </Button>
                        </div>
                    </Segment>
                </div>
            </Grid.Row>
            <Grid.Row only="tablet mobile" style={{padding: 0}}>
            <div style={{width: "100%"}}>
                    <Segment style={{ backgroundColor: "lightGray", borderBottom: "5px solid grey", paddingLeft: "25px", paddingRight: "25px" }}>
                        <Form>
                            <Form.Group style={{justifyContent: "space-between"}}>
                                <Form.Field>
                                    <Form.Checkbox
                                        label="Show Precompilers"
                                        onChange={handleFilters("showPrecompilers")}
                                        checked={filter.showPrecompilers}
                                        slider
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Checkbox
                                        label="Favorites Only"
                                        onChange={handleFilters("onlyFavorites")}
                                        checked={filter.onlyFavorites}
                                        slider
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field width={16}>
                                    <Form.Dropdown
                                        label="Tags:"
                                        options={props.tags}
                                        onChange={handleTagsChanged}
                                        multiple
                                        selection
                                        fluid
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Segment>
                </div>
            </Grid.Row>
        </Grid>
    )
};
