import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Modal } from "react-bootstrap";
// import RecipeSearchSwipe from "../utils/ext-api-calls/recipe-ext-api/searchRecipesReact";

export default function SearchForm() {
  const [formSearchSpecs, setformSearchSpecs] = useState({
    method: "recipes.search.v3",
    format: "json",
    max_results: 50,
    search_expression: "",
    recipe_types: "",
    recipe_types_matchall: "false",
    must_have_images: "true",
    "calories.from": "",
    "calories.to": "",
    "carb_percentage.from": "",
    "carb_percentage.to": "",
    "protein_percentage.from": "",
    "protein_percentage.to": "",
    "fat_percentage.from": "",
    "fat_percentage.to": "",
    "prep_time.from": "",
    "prep_time.to": "",
  });
  const [searchFormErrors, setSearchFormErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //checking specs for all inputs as they change
  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    setformSearchSpecs({
      ...formSearchSpecs,
      [name]: value,
    });
  };

  //yuge verification block for edit/alert messages
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    let isValid = true;
    const errorMessagesSet = new Set();

    //need to make sure it's between 1 and 100, also min must be less than max
    const percentageFields = [
      "carb_percentage",
      "protein_percentage",
      "fat_percentage",
    ];

    percentageFields.forEach((field) => {
      if (
        formSearchSpecs[`${field}.from`] < 0 ||
        formSearchSpecs[`${field}.from`] > 100
      ) {
        errors[`${field}.from`] = "Must be between 0 and 100.";
        errorMessagesSet.add(
          "Error in ${field}.from: Must be between 0 and 100."
        );
        isValid = false;
      }
      if (
        formSearchSpecs[`${field}.to`] < 0 ||
        formSearchSpecs[`${field}.to`] > 100
      ) {
        errors[`${field}.to`] = "Must be between 0 and 100.";
        errorMessagesSet.add(
          "Error in ${field}.to: Must be between 0 and 100."
        );
        isValid = false;
      }
      if (
        formSearchSpecs[`${field}.from`] &&
        formSearchSpecs[`${field}.to`] &&
        parseFloat(formSearchSpecs[`${field}.from`]) >
          parseFloat(formSearchSpecs[`${field}.to`])
      ) {
        errors[`${field}.from`] = "Minimum cannot be greater than Maximum.";
        errorMessagesSet.add(
          "Error in ${field} from: Minimum cannot be greater than Maximum."
        );
        isValid = false;
      }
    });

    const preptimeFields = ["prep_time.from", "prep_time.to"];

    preptimeFields.forEach((field) => {
      if (
        formSearchSpecs["prep_time.from"] &&
        formSearchSpecs["prep_time.to"] &&
        parseFloat(formSearchSpecs["prep_time.from"]) >
          parseFloat(formSearchSpecs["prep_time.to"])
      ) {
        errors["prep_time.from"] = "Minimum cannot be greater than Maximum.";
        errorMessagesSet.add(
          "Error in prep time: Minimum cannot be greater than Maximum."
        );
        isValid = false;
      }
    });
    const calorieFields = ["calories.from", "calories.to"];

    calorieFields.forEach((field) => {
      if (
        formSearchSpecs["calories.from"] &&
        formSearchSpecs["calories.to"] &&
        parseFloat(formSearchSpecs["calories.from"]) >
          parseFloat(formSearchSpecs["calories.to"])
      ) {
        errors["calories.from"] = "Minimum cannot be greater than Maximum.";
        errorMessagesSet.add(
          "Error in calories: Minimum cannot be greater than Maximum."
        );
        isValid = false;
      }
    });

    //need to make sure at least one thing is filled out, submitting blank form would be silly.
    const atLeastOne = [
      "search_expression",
      "recipe_types",
      "calories.from",
      "calories.to",
      "carb_percentage.from",
      "carb_percentage.to",
      "protein_percentage.from",
      "protein_percentage.to",
      "fat_percentage.from",
      "fat_percentage.to",
      "prep_time.from",
      "prep_time.to",
    ];

    const isFormEmpty = atLeastOne.every((field) => !formSearchSpecs[field]);
    if (isFormEmpty) {
      errors["form"] = "You must specify at least one search term.";
      errorMessagesSet.add("You must specify at least one search term.");
      isValid = false;
    }

    // Set errors if any need to be set
    if (!isValid) {
      setSearchFormErrors(errors);
      setErrorMessage(Array.from(errorMessagesSet).join("\n"));
      setShowErrorModal(true);
      return;
    }

    // -------Actually calling the fabled external API-------
    fetchSearchResults(formSearchSpecs);
  };

  const handleCloseModal = () => setShowErrorModal(false);

  //------begin actual UI rendering----------------
  return (
    <>
      <Card className="p-4 my-3">
        <Card.Body>
          <Card.Title>Recipe Search</Card.Title>
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group controlId="searchExpression" className="mb-3">
              <Form.Label>
                Enter any keywords for desired ingredients, separated by commas.
              </Form.Label>
              <Form.Control
                type="text"
                name="search_expression"
                placeholder="chicken"
                value={formSearchSpecs.search_expression}
                onChange={handleSearchInputChange}
              />
            </Form.Group>

            <Form.Group controlId="recipeType" className="mb-3">
              <Form.Label>Choose a recipe type:</Form.Label>
              <Form.Select
                name="recipe_type"
                value={formSearchSpecs.recipe_types}
                onChange={handleSearchInputChange}
              >
                <option value="">--Please choose an option--</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Soup">Soup</option>
                <option value="Main Dish">Main Dish</option>
                <option value="Side Dish">Side Dish</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Baked">Baked</option>
                <option value="Salad and Salad Dressing">
                  Salad and Salad Dressing
                </option>
                <option value="Sauce and Condiment">Sauce and Condiment</option>
                <option value="Beverage">Beverage</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            {/* Calories */}
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="caloriesFrom" className="mb-3">
                  <Form.Label>Minimum Calories</Form.Label>
                  <Form.Control
                    type="number"
                    name="calories.from"
                    placeholder="0"
                    value={formSearchSpecs["calories.from"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="caloriesTo" className="mb-3">
                  <Form.Label>Maximum Calories</Form.Label>
                  <Form.Control
                    type="number"
                    name="calories.to"
                    placeholder="2000"
                    value={formSearchSpecs["calories.to"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Carb Percentage */}
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="carbPercentageFrom" className="mb-3">
                  <Form.Label>Minimum Carb Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="carb_percentage.from"
                    placeholder="0"
                    value={formSearchSpecs["carb_percentage.from"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="carbPercentageTo" className="mb-3">
                  <Form.Label>Maximum Carb Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="carb_percentage.to"
                    placeholder="100"
                    value={formSearchSpecs["carb_percentage.to"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Protein Percentage */}
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="proteinPercentageFrom" className="mb-3">
                  <Form.Label>Minimum Protein Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="protein_percentage.from"
                    placeholder="0"
                    value={formSearchSpecs["protein_percentage.from"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="proteinPercentageTo" className="mb-3">
                  <Form.Label>Maximum Protein Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="protein_percentage.to"
                    placeholder="100"
                    value={formSearchSpecs["protein_percentage.to"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Fat Percentage */}
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="fatPercentageFrom" className="mb-3">
                  <Form.Label>Minimum Fat Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="fat_percentage.from"
                    placeholder="0"
                    value={formSearchSpecs["fat_percentage.from"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="fatPercentageTo" className="mb-3">
                  <Form.Label>Maximum Fat Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    name="fat_percentage.to"
                    placeholder="100"
                    value={formSearchSpecs["fat_percentage.to"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Prep Time */}
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="prepTimeFrom" className="mb-3">
                  <Form.Label>Minimum Prep Time (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    name="prep_time.from"
                    placeholder="0"
                    value={formSearchSpecs["prep_time.from"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="prepTimeTo" className="mb-3">
                  <Form.Label>Maximum Prep Time (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    name="prep_time.to"
                    placeholder="1000"
                    value={formSearchSpecs["prep_time.to"]}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              I'm hungry!
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/*this modal is only for search form error popups */}
      <Modal show={showErrorModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ whiteSpace: "pre-wrap" }}>{errorMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
