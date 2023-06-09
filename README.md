# blog-plugin-hide-attachments

A plugin generated by kotlin-atlassian-client for our blog that demonstrated how to hide attachments in jira issues

## Demonstrates how to ...
 
 - ... use kotlin-atlassian-client to create a new jira plugin
 - ... make a plugin serve javascript files
 - ... use javascript to modify the issue page

## Motivation

When Jira Issues are automatically created from emails, they often contain a lot of images, such as small icons from various social networks or company logos as shown in the corresponding blog post.

As a result, an important PDF document tends to get overlooked, since Jira imports and displays everything equally as an attachment. The images therefore appear twice. Embedded in the description as well as an attachment.

Although Jira offers many possibilities for customization, there is unfortunately no way to influence this behavior. This repository contains the finished plugin that hides images that are already visible in the description from the attachments section.
