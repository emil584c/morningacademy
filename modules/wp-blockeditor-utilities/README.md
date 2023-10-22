# WP Blockeditor Utilities

## ImageControl

### ImageControl

For InspectorControls (sidebar)

```jsx
 <PanelBody
    title={'Billede'}
>
    <ImageControl
        label={'Vælg billede'}
        onChange={(media) => setAttributes({ media })}
        value={attributes.media}
        size={'large'}/>
</PanelBody>
```

### ImageToolbar

For Block Toolbar

```jsx
<ToolbarGroup>
    <ImageToolbar
        label={'Vælg billede'}
        onChange={(media) => setAttributes({ media })}
        value={attributes.media}
        size={'thumbnail'}
    />
</ToolbarGroup>
```

## Spacing

In BlockControls:

```jsx
<ToolbarGroup>
    <SpacingControl
        value={attributes.spacing}
        onChange={(spacing) => setAttributes({ spacing })}/>
</ToolbarGroup>
```

In Block:

```jsx
<section {...blockProps}>
    <Spacer position={'top'} spacings={attributes.spacing}/>
    <p>BLOCK CONTENT</p>
    <Spacer position={'bottom'} spacings={attributes.spacing}/>
</section>
```

## Single Item Search

This component makes it easy to search for a WordPress post or term

### In InspectorControls (sidebar)

```jsx
<InspectorControls>
    <PanelBody
        title={'Search for Post'}
    >
        <SingleItemSearch
            usePopover
            onChange={(post) => doStuffWithPost}
        />
    </PanelBody>
</InspectorControls>
```

### In BlockControls (toolbar)

```jsx
<BlockControls>
    <ToolbarGroup>
        <SingleItemSearchToolbarButton
            onChange={(post) => doStuffWithPost}
        />
    </ToolbarGroup>
</BlockControls>
```

### As a render appender

```jsx
<InnerBlocks
    renderAppender={() => <SingleItemSearchRenderAppender onChange={insertPost}/>}
/>
```

To insert an inner child

```js
import { useDispatch } from '@wordpress/data'
import { createBlock } from '@wordpress/blocks'

const { insertBlock } = useDispatch('core/block-editor')
const insertPost = function (employee) {
    let updateSelection = false // Makes it so that input focus / selection is not moved to the new block
    insertBlock(createBlock('test/post', { post: post }), -1, clientId, updateSelection)
}
```

### Properties

```jsx
// SingleItemSearch
{
    onChange,
        placeholder = __('Search'),
        subType = 'post,page',
        perPage = 3,
        type = 'post',
        renderResults = undefined,
        usePopover = false,
        className = ''
}
// SingleItemSearchToolbarButton
{
    onChange,
        icon = search,
        title = __('Search'),
        placeholder = undefined,
        isActive = undefined,
        isDisabled = undefined,
        subType = undefined,
        perPage = undefined,
        type = undefined
}

// SingleItemSearchRenderAppender
{
    onChange,
        icon = plus,
        title = __('Search'),
        placeholder = undefined,
        subType = undefined,
        perPage = undefined,
        type = undefined,
        className = 'single-item-search__render-appender'
}
```
