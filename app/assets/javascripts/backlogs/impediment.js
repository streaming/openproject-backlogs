//-- copyright
// OpenProject Backlogs Plugin
//
// Copyright (C)2013-2014 the OpenProject Foundation (OPF)
// Copyright (C)2011 Stephan Eckardt, Tim Felgentreff, Marnen Laibow-Koser, Sandro Munda
// Copyright (C)2010-2011 friflaj
// Copyright (C)2010 Maxime Guilbot, Andrew Vit, Joakim Kolsjö, ibussieres, Daniel Passos, Jason Vasquez, jpic, Emiliano Heyns
// Copyright (C)2009-2010 Mark Maglana
// Copyright (C)2009 Joe Heck, Nate Lowrie
//
// This program is free software; you can redistribute it and/or modify it under
// the terms of the GNU General Public License version 3.
//
// OpenProject Backlogs is a derivative work based on ChiliProject Backlogs.
// The copyright follows:
// Copyright (C) 2010-2011 - Emiliano Heyns, Mark Maglana, friflaj
// Copyright (C) 2011 - Jens Ulferts, Gregor Schmidt - Finn GmbH - Berlin, Germany
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

/**************************************
  IMPEDIMENT
***************************************/

RB.Impediment = (function ($) {
  return RB.Object.create(RB.Task, {

    initialize: function (el) {
      var j;  // This ensures that we use a local 'j' variable, not a global one.

      this.$ = j = $(el);
      this.el = el;

      j.addClass("impediment"); // If node is based on #task_template, it doesn't have the impediment class yet

      // Associate this object with the element for later retrieval
      j.data('this', this);

      j.find(".editable").live('mouseup', this.handleClick);
    },

    // Override saveDirectives of RB.Task
    saveDirectives: function () {
      var j, prev, statusID, data, url;

      j = this.$;
      prev = this.$.prev();
      statusID = j.parent('td').first().attr('id').split("_")[1];

      data = j.find('.editor').serialize() +
                 "&is_impediment=true" +
                 "&fixed_version_id=" + RB.constants.sprint_id +
                 "&status_id=" + statusID +
                 "&prev=" + (prev.length === 1 ? prev.data('this').getID() : '') +
                 (this.isNew() ? "" : "&id=" + j.children('.id').text());

      if (this.isNew()) {
        url = RB.urlFor('create_impediment', {sprint_id: RB.constants.sprint_id});
      }
      else {
        url = RB.urlFor('update_impediment', {id: this.getID(), sprint_id: RB.constants.sprint_id});
        data += "&_method=put";
      }

      return {
        url: url,
        data: data
      };
    }
  });
}(jQuery));
