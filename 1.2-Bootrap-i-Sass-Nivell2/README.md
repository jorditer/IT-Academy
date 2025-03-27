# Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Layout](#layout)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Project Overview

This project is part of a school assignment aimed at teaching web development concepts using HTML, CSS, and Bootstrap. The goal is to create a functional and aesthetically pleasing bookmark manager that can be used across multiple browsers.

## Technologies Used

- **HTML5**: Markup language used for structuring the content.
- **CSS3**: Stylesheet language used for describing the presentation of the document.
- **Bootstrap 5.3.3**: CSS framework used for responsive design and prebuilt components.
- **JavaScript**: Used for interactive elements like the accordion in the FAQ section.
- **SASS 10.5.2**: A preprocessor scripting language that is interpreted or compiled into CSS. Makes CSS more maintainable and easier to write

## Layout

The layout of the page is structured as follows:

1. **Navigation**: The top navigation bar.
2. **Hero Section**: A section with a headline, description, and call-to-action buttons.
3. **Features Section**: A section highlighting the features of the bookmark manager.
4. **Download Section**: A section with cards for different browsers, each containing a button to add and install the extension.
5. **FAQ Section**: An accordion-style FAQ section to answer common questions.

### Excerpt from the FAQ Section

```html
<!-- FAQ -->
<div class="row justify-content-center my-5">
    <div class="col-12 col-lg-9">
        <div class="col-12 col-md-7 col-lg-12 mx-auto text-center mb-5">
            <h3 class="fw-bold">Frequently Asked Questions</h3>
            <p class="col-lg-8 text-center mx-auto">Here are some of our FAQs. If you have any other questions you'd like answered please feel free to email us.</p>
        </div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button custom-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        What is a Bookmark?
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae porro provident repellat velit aliquam, expedita laboriosam eum reprehenderit debitis fugiat accusantium molestias vero nihil quaerat assumenda unde exercitationem. Odio!
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/bookmark-manager.git
    ```

2. Navigate to the project directory:
    ```sh
    cd bookmark-manager
    ```

3. Open [`index.html`] in your preferred web browser to view the project.

## Usage

- Open the [`index.html`] file in a web browser to use the Bookmark Manager.
- Use the buttons to add and install the extension for your preferred browser.
- Refer to the FAQ section for any questions.


## License

This project is licensed under the MIT License.
```
