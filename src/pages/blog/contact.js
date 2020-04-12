import React from "react"

import BlogPage from "../../components/blog-page"

const Contact = () => (
  <BlogPage>
    <form
      name="contact"
      action="/blog/"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <label>
          Don’t fill this out:{" "}
          <input name="bot-field" />
        </label>
      </div>
      <p>
        <label>
          Your Name: <input required type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea required name="message"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </BlogPage>
)

export default Contact
