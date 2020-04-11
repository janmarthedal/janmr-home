import React from "react"

import BlogPage from "../../components/blog-page"

const FormTest = () => (
  <BlogPage>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" netlify>
      <input type="hidden" name="bot-field" />
      <p>
        <label>
          Your Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </BlogPage>
)

export default FormTest
