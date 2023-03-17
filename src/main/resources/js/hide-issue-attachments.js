/*
 * #%L
 * blog-plugin
 * %%
 * Copyright (C) 2021 - 2022 The Plugin Authors
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

AJS.toInit(() => {

    const extractAttachmentIdFromImg = img => {
        const src = img && img.src
        if (!src) return undefined
        let match = src.match(/[a-zA-Z]+:\/\/.*\/(thumbnail|attachment)\/(?<id>\d+)\/.*/)
        if (match && match.length > 2) return match.groups.id
    }

    const hideAttachmentsForEmbeddedImages = (attachments /* : NodeList*/, embeddedImages /* : NodeList*/) => {
        const embeddedImgIds = Array.from(embeddedImages)
            .map(extractAttachmentIdFromImg)

        for (const listItem of attachments) {
            const attachmentImg = listItem.querySelector("img")
            const attachmentImgId = extractAttachmentIdFromImg(attachmentImg)
            if (!attachmentImgId) continue // attachment has no image

            if (embeddedImgIds.includes(attachmentImgId)) {
                console.info(`[BLOG] hid attachment from DOM with image id=${attachmentImgId} element:%o`, listItem)
                listItem.style.display = "none"
            }
        }
    }

    const alreadyExecutedId = "hide-issue-attachment-was-already-executed"

    const addAlreadyExecutedLiElement = attachmentModule => {
        const iWasHere = document.createElement("li")
        iWasHere.id = alreadyExecutedId
        iWasHere.style.display = "none"
        attachmentModule.querySelector("#attachment_thumbnails").appendChild(iWasHere)
    };

    const observeContentNode = (/*mutationsList, observer*/) => {
        if (document.getElementById(alreadyExecutedId)) return
        const attachmentModule = document.querySelector("#attachmentmodule")
        if (!attachmentModule) return
        const descriptionModule = document.querySelector("#descriptionmodule")
        if (!descriptionModule) return

        const attachmentsList = attachmentModule.querySelectorAll("#attachment_thumbnails li")
        addAlreadyExecutedLiElement(attachmentModule) // increases attachmentsList.length
        if (attachmentsList.length === 0) return // no attachments to hide
        const embeddedImages = document.querySelectorAll("#descriptionmodule img")
        if (embeddedImages.length === 0) return
        hideAttachmentsForEmbeddedImages(attachmentsList, embeddedImages)
    }

    const observeContentAndHideAttachments = () => {
        const targetNode = document.getElementById("content")
        if (!targetNode) {
            console.info("[BLOG] hide-issue-attachments failed to load, because the document does not contain 'content' node.")
        } else {
            console.info("[BLOG] hide-issue-attachments modification loaded.")
            const observer = new MutationObserver(observeContentNode)
            observer.observe(targetNode, {
                childList: true,
                subtree: true,
            })
        }
    }

    observeContentAndHideAttachments()
})
