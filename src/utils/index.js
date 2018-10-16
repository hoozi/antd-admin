export function formatterMenus(menus, parentPath = '') {
  return menus.map(item => {
    let { path } = item;
    
    if(!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path
    };
    if (item.children.length > 0) {
      result.children = formatterMenus(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export function isUrl(string) {
  // eslint-disable-next-line
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  // eslint-disable-next-line
  const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
  // eslint-disable-next-line
  const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof string !== 'string') {
    return false;
  }

  const match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (localhostDomainRE.test(everythingAfterProtocol) ||
      nonLocalhostDomainRE.test(everythingAfterProtocol)) {
    return true;
  }

  return false;
}