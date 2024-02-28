async function applyChanges(event) {
    // redecorate default content and blocks on patches (in the properties rail)
    const { detail } = event;
    console.log('event payload', detail);
    const resource = detail?.request?.target?.resource // update, patch components
      || detail?.request?.target?.container?.resource // update, patch, add to sections
      || detail?.request?.to?.container?.resource; // move in sections

    console.log(resource);
    if (!resource) return false;
    const updates = detail?.response?.updates;
    if (!updates.length) return false;
    const { content } = updates[0];
    if (!content) return false;
    return true;
}
function attachEventListners(main) {
    [
      'aue:content-patch',
      'aue:content-update',
      'aue:content-add',
      'aue:content-move',
      'aue:content-remove',
    ].forEach((eventType) => main?.addEventListener(eventType, async (event) => {
      event.stopPropagation();
      const applied = await applyChanges(event);
      if (!applied) window.location.reload();
    }));
  }
  
  attachEventListners(document.querySelector('main'));