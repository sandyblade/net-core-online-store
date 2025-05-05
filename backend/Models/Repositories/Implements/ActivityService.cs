/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2025
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */


using backend.Models.DTO;
using backend.Models.Entities;
using backend.Models.Repositories.Interfaces;
using System.Linq.Dynamic.Core;

namespace backend.Models.Repositories.Implements
{
    public class ActivityService : IActivityRepository
    {
        private readonly AppDbContext _db;

        public ActivityService(AppDbContext db)
        {
            _db = db;
        }

        public Activity SaveActivity(User User, String Event, String Subject, String Description)
        {
            Activity NewActivity = new Activity() { User = User, Event = Event, Subject = Subject, Description = Description };
            _db.Add(NewActivity);
            _db.SaveChanges();
            return NewActivity;
        }

        public List<Activity> GetByUser(User user)
        {
            return _db.Activity.Where(x => x.User == user).OrderByDescending(x => x.Id).ToList();
        }

    }
}
